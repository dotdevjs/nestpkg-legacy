/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { DynamicModule, Logger, Type } from '@nestjs/common';
import {
  getConnectionToken,
  TypeOrmModule as BaseTypeOrmModule,
} from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { TYPEORM_MODULE_OPTIONS } from '@nestjs/typeorm/dist/typeorm.constants';
import * as fs from 'fs';
import * as path from 'path';
import { Connection, ConnectionOptions } from 'typeorm';

import { UuidNormalizerSubscriber } from './subscribers/uuid-normalizer.subscriber';

export class TypeOrmModule {
  static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    return BaseTypeOrmModule.forRoot({
      ...options,
      subscribers: TypeOrmModule.createDefaultSubscribers(options?.subscribers),
    });
  }

  static forTest(options?: TypeOrmModuleOptions): DynamicModule {
    const defaultOptions: Partial<TypeOrmModuleOptions> = {
      autoLoadEntities: true,
      dropSchema: true,
      synchronize: true,
      logging: false,
    };
    try {
      const ormConfigJSON = fs
        .readFileSync(path.join(process.cwd(), 'ormconfig.json'))
        .toString();

      const ormConfig = JSON.parse(ormConfigJSON);

      Logger.debug('[TypeOrmModule] ormconfig.json found.');

      return BaseTypeOrmModule.forRoot({
        ...defaultOptions,
        ...ormConfig,
        ...options,
        subscribers: TypeOrmModule.createDefaultSubscribers(
          options?.subscribers
        ),
      } as TypeOrmModuleOptions);
    } catch (e) {
      Logger.error(e);
      Logger.debug('[TypeOrmModule] Fallback to sqlite.');

      return BaseTypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        ...defaultOptions,
        ...((options as any) || []),
        subscribers: TypeOrmModule.createDefaultSubscribers(
          options?.subscribers
        ),
      });
    }
  }

  static async synchronize(moduleRef: {
    get<TInput = any, TResult = TInput>(
      typeOrToken: Type<TInput> | string | symbol,
      options?: {
        strict: boolean;
      }
    ): TResult;
  }) {
    const connectionOptions = moduleRef.get<ConnectionOptions>(
      TYPEORM_MODULE_OPTIONS,
      {
        strict: false,
      }
    );
    const connectionToken = getConnectionToken(connectionOptions) as string;
    await moduleRef.get<Connection>(connectionToken).synchronize(true);
  }

  private static createDefaultSubscribers(subscribers: (Function | string)[]) {
    return [...(subscribers || []), UuidNormalizerSubscriber];
  }
}
