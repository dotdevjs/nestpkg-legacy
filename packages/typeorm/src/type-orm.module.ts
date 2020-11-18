import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { EntityProviderService } from './services';

const TypeOrmServices: DynamicModule = {
  module: BaseTypeOrmModule,
  providers: [EntityProviderService],
  exports: [EntityProviderService],
};

export class TypeOrmModule {
  static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    return BaseTypeOrmModule.forRootAsync({
      imports: [TypeOrmServices],
      useFactory: (entityProvider: EntityProviderService) => {
        const entities = [
          ...entityProvider.getEntities(),
          ...(options.entities || []),
        ];

        return {
          ...options,
          entities,
        };
      },
      inject: [EntityProviderService],
    });
  }
}
