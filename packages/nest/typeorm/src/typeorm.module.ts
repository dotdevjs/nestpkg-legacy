import { Connection, ConnectionOptions, getMetadataArgsStorage } from 'typeorm';
import { DynamicModule, Logger, Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  InjectConnection,
  TypeOrmModule as BaseTypeOrmModule,
} from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

// TypeOrm monkeypatch
import './subscriber/broadcaster.hook';

import { SluggableSubscriber } from './decorators/sluggable.decorator';
import { getOrmConfigFs } from './utils';

// Issue: https://github.com/nestjs/typeorm/issues/112
@Module({})
export class TypeOrmModule implements OnModuleInit {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly moduleRef: ModuleRef
  ) {}

  onModuleInit(): void {
    this.registerEventSubscribers();
  }

  static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    return {
      module: TypeOrmModule,
      imports: [TypeOrmCoreModule.forRoot(options)],
      providers: [SluggableSubscriber],
    };
  }

  static forTest(options?: TypeOrmModuleOptions): DynamicModule {
    options = Object.assign(
      {
        autoLoadEntities: true,
        dropSchema: true,
        synchronize: true,
        logging: false,
        type: 'sqlite',
        database: ':memory:',
      },
      options,
      getOrmConfigFs()
    );

    return TypeOrmModule.forRoot(options);
  }

  static forFeature(
    entities?: EntityClassOrSchema[],
    connection?: Connection | ConnectionOptions | string
  ): DynamicModule {
    return BaseTypeOrmModule.forFeature(entities, connection);
  }

  private registerEventSubscribers(): void {
    const subscribers = getMetadataArgsStorage().entitySubscribers.map(
      (s) => s.target
    );
    subscribers.forEach((subscriber: any) => {
      try {
        const subscriberService = this.moduleRef.get(subscriber, {
          strict: false,
        });
        this.connection.subscribers.push(subscriberService);
      } catch (e) {
        Logger.error(e.message);
      }
    });
  }
  // static async synchronize(moduleRef: {
  //   get<TInput = any, TResult = TInput>(
  //     typeOrToken: Type<TInput> | string | symbol,
  //     options?: {
  //       strict: boolean;
  //     }
  //   ): TResult;
  // }) {
  //   const connectionOptions = moduleRef.get<ConnectionOptions>(
  //     TYPEORM_MODULE_OPTIONS,
  //     {
  //       strict: false,
  //     }
  //   );
  //   const connectionToken = getConnectionToken(connectionOptions) as string;
  //   await moduleRef.get<Connection>(connectionToken).synchronize(true);
  // }
}
