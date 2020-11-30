import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';

export const getOrmConfigFs = (
  filename = 'ormconfig.json',
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
