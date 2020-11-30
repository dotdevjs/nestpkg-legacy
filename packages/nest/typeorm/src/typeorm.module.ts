import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { getOrmConfigFs } from './utils';

// TypeOrm monkeypatch
import './subscriber/broadcaster.hook';

export class TypeOrmModule extends BaseTypeOrmModule {
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

    return BaseTypeOrmModule.forRoot(options);
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
