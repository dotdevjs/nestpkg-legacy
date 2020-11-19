import { DynamicModule } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
export declare class TypeOrmModule {
    static forTest(options?: TypeOrmModuleOptions): DynamicModule;
}
