import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import * as fs from 'fs';
import * as path from 'path';

export const getOrmConfigFs = (
  filename = 'ormconfig.test.json',
  rootDir: string = process.cwd()
): TypeOrmModuleOptions => {
  try {
    const ormConfigJSON = fs
      .readFileSync(path.join(rootDir, filename))
      .toString();

    return JSON.parse(ormConfigJSON) as TypeOrmModuleOptions;
  } catch (e) {
    return undefined;
  }
};

export class TypeOrmModule extends BaseTypeOrmModule {
  static forTest(options?: TypeOrmModuleOptions): DynamicModule {
    options = Object.assign(
      {
        autoLoadEntities: true,
        dropSchema: true,
        synchronize: true,
        logging: false,
      },
      options,
      getOrmConfigFs()
    );

    return BaseTypeOrmModule.forRoot(options);
  }

  // static async synchronize(moduleRef: {
  //   get<TInput = any, TResult = TInput>(
  //     typeOrToken: Type<TInput> | string | symbol,
  //     options?: {
  //       strict: boolean;
  //     }
  //   ): TResult;
  // }) {
  //   const connectionOptions = moduleRef.get<ConnectionOptions>(
  //     TYPEORM_MODULE_OPTIONS,
  //     {
  //       strict: false,
  //     }
  //   );
  //   const connectionToken = getConnectionToken(connectionOptions) as string;
  //   await moduleRef.get<Connection>(connectionToken).synchronize(true);
  // }
}
