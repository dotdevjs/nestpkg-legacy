import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestpkg/typeorm';

import { getOrmConfigFs } from '../src/utils';

it('getOrmConfigFs', () => {
  const options = getOrmConfigFs(
    'ormconfig.json',
    path.join(__dirname, '__fixtures__')
  );
  expect(options).toStrictEqual({
    type: 'sqlite',
    database: ':memory:',
  } as TypeOrmModuleOptions);
});
