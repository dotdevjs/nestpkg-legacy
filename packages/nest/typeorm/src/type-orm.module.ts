/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { DynamicModule, Logger } from '@nestjs/common';
import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import * as fs from 'fs';
import * as path from 'path';

export class TypeOrmModule extends BaseTypeOrmModule {
  static forTest(options?: TypeOrmModuleOptions): DynamicModule {
    options = {
      autoLoadEntities: true,
      dropSchema: true,
      synchronize: true,
      logging: false,
      ...options,
    };

    try {
      Logger.debug('[TypeOrmModule] ormconfig.json found.');

      options = {
        ...TypeOrmModule.createORMConfig(),
        ...(options as any),
      };
    } catch (e) {
      Logger.error(e);

      options = {
        type: 'sqlite',
        database: ':memory:',
        ...(options as any),
      };
    }

    return BaseTypeOrmModule.forRoot(options);
  }

  private static createORMConfig(): TypeOrmModuleOptions {
    // TODO: env filename
    const ormConfigJSON = fs
      .readFileSync(path.join(process.cwd(), 'ormconfig.json'))
      .toString();

    return JSON.parse(ormConfigJSON) as TypeOrmModuleOptions;
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

  // private static createDefaultSubscribers(subscribers: (Function | string)[]) {
  //   return [...(subscribers || []), UuidNormalizerSubscriber];
  // }
}
