/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { DynamicModule, Logger } from '@nestjs/common';
import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import * as fs from 'fs';
import * as path from 'path';

import { UuidNormalizerSubscriber } from './subscribers/uuid-normalizer.subscriber';

export class TypeOrmModule {
  static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    options = {
      ...options,
      subscribers: TypeOrmModule.createDefaultSubscribers(options?.subscribers),
    };
    return BaseTypeOrmModule.forRoot(options);
  }

  static forTest(options?: TypeOrmModuleOptions): DynamicModule {
    try {
      const ormConfigJSON = fs
        .readFileSync(path.join(process.cwd(), 'ormconfig.json'))
        .toString();
      const ormConfig = JSON.parse(ormConfigJSON);

      options = {
        ...ormConfig,
        ...options,
        subscribers: TypeOrmModule.createDefaultSubscribers(
          options?.subscribers
        ),
      };

      Logger.debug('[TypeOrmModule] ormconfig.json found.');

      return BaseTypeOrmModule.forRoot(options);
    } catch (e) {
      options = {
        type: 'sqlite',
        database: ':memory:',
        autoLoadEntities: true,
        dropSchema: true,
        synchronize: true,
        logging: false,
        ...((options as any) || []),
        subscribers: TypeOrmModule.createDefaultSubscribers(
          options?.subscribers
        ),
      };

      Logger.error(e);
      Logger.debug('[TypeOrmModule] Fallback to sqlite.');

      return BaseTypeOrmModule.forRoot(options);
    }
  }

  private static createDefaultSubscribers(subscribers: (Function | string)[]) {
    return [...(subscribers || []), UuidNormalizerSubscriber];
  }
}
