/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

import { UuidNormalizerSubscriber } from './subscribers/uuid-normalizer.subscriber';

export class TypeOrmModule {
  static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    options = {
      ...(options || {}),
      subscribers: TypeOrmModule.createDefaultSubscribers(options?.subscribers),
    };
    return BaseTypeOrmModule.forRoot(options);
  }

  static forTest(options?: TypeOrmModuleOptions): DynamicModule {
    options = {
      type: 'sqlite',
      database: ':memory:',
      autoLoadEntities: true,
      dropSchema: true,
      synchronize: true,
      logging: false,
      ...((options as any) || []),
      subscribers: TypeOrmModule.createDefaultSubscribers(options?.subscribers),
    };

    return BaseTypeOrmModule.forRoot(options);
  }

  private static createDefaultSubscribers(subscribers: (Function | string)[]) {
    return [...(subscribers || []), UuidNormalizerSubscriber];
  }
}
