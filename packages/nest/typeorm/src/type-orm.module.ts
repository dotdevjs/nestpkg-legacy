import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

export class TypeOrmModule {
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
