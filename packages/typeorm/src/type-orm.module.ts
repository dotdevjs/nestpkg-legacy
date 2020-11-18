import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { EntityProviderService } from './services';

@Global()
@Module({
  providers: [EntityProviderService],
  exports: [EntityProviderService],
})
export class TypeOrmModule {
  static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    return BaseTypeOrmModule.forRootAsync({
      imports: [TypeOrmModule],
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
