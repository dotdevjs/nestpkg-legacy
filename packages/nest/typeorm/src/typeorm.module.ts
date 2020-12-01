import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { getOrmConfigFs } from './utils';

// TypeOrm monkeypatch
import './subscriber/broadcaster.hook';
import { getMetadataArgsStorage } from 'typeorm';

// Issue: https://github.com/nestjs/typeorm/issues/112
export class TypeOrmModule extends BaseTypeOrmModule {
  static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    options = Object.assign(options, {
      subscribers: [
        ...(options.subscribers || []),
        ...TypeOrmModule.getEntitySubscribers(),
      ],
    });

    return BaseTypeOrmModule.forRoot(options);
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

    options = Object.assign(options, {
      subscribers: [
        ...(options.subscribers || []),
        ...TypeOrmModule.getEntitySubscribers(),
      ],
    });

    return TypeOrmModule.forRoot(options);
  }

  /**
   * TODO: filter/get subscriber from container
   */
  private static getEntitySubscribers() {
    return getMetadataArgsStorage().entitySubscribers.map((s) => s.target);
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
