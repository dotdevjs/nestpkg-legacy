import { Connection, ConnectionOptions } from 'typeorm';
import { DynamicModule } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
// import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';

import { SluggableSubscriber } from './decorators/sluggable.decorator';

// TypeOrm monkeypatch
import './subscriber/broadcaster.hook';

// Issue: https://github.com/nestjs/typeorm/issues/112
export class TypeOrmModule {
  static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    return {
      module: BaseTypeOrmModule,
      imports: [DiscoveryModule, BaseTypeOrmModule.forRoot(options)],
      providers: [SluggableSubscriber],
    };
  }

  static forFeature(
    entities?: EntityClassOrSchema[],
    connection?: Connection | ConnectionOptions | string
  ): DynamicModule {
    return BaseTypeOrmModule.forFeature(entities, connection);
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
