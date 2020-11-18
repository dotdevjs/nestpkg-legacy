import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { EntityProviderService } from './services';

const TypeOrmServices: DynamicModule = {
  module: BaseTypeOrmModule,
  providers: [EntityProviderService],
  exports: [EntityProviderService],
};

const TypeOrmOptionsFactory = (
  entityProvider: EntityProviderService,
  options?: TypeOrmModuleOptions
) => {
  const entities = [
    ...entityProvider.getEntities(),
    ...(options?.entities || []),
  ];

  return {
    ...options,
    entities,
  };
};

export class TypeOrmModule {
  static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    return BaseTypeOrmModule.forRootAsync({
      imports: [TypeOrmServices],
      useFactory: (entityProvider: EntityProviderService) =>
        TypeOrmOptionsFactory(entityProvider, options),
      inject: [EntityProviderService],
    });
  }

  static forTest(options?: TypeOrmModuleOptions): DynamicModule {
    return TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      synchronize: true,
      logging: false,
      ...((options as any) || []),
    });
  }
}
