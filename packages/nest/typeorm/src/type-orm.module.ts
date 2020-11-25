import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

import { UuidNormalizerSubscriber } from './subscribers/uuid-normalizer.subscriber';

export class TypeOrmModule {
  forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    options = {
      subscribers: [...(options.subscribers || []), UuidNormalizerSubscriber],
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
      // TODO: fix any
      ...((options as any) || []),
    };

    return BaseTypeOrmModule.forRoot(options);
  }
}
