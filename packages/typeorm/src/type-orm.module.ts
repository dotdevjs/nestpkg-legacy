import {
  TypeOrmModule,
  TypeOrmModule as BaseTypeOrmModule,
} from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { DynamicModule } from '@nestjs/common';
import { EntityProviderService } from './services';

export class TypeormModule extends BaseTypeOrmModule {
  static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    return TypeOrmModule.forRootAsync({
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
