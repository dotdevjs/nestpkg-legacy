import '@nestpkg/crud-request';

export {
  CrudController,
  Override,
  CrudRequest,
  CrudOptions,
  ParsedRequest,
  ParsedBody,
  CrudActions,
  CrudRequestOptions,
  CrudService,
  GetManyDefaultResponse,
} from '@nestjsx/crud';
export { R } from '@nestjsx/crud/lib/crud/reflection.helper';
export { CRUD_OPTIONS_METADATA } from '@nestjsx/crud/lib/constants';

import {
  QueryFilter,
  QueryJoin,
  QueryFields,
  ComparisonOperator,
} from '@nestjsx/crud-request/lib/types/request-query.types';
export { QueryFilter, QueryJoin, QueryFields, ComparisonOperator };

export * from './constraints/is-valid-entity.constraint';
export * from './decorators/crud.decorator';
export * from './model/base-entity.model';
export * from './crud.module';

import { InternalServerErrorException, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CrudRequest } from '@nestjsx/crud';
import { Repository } from 'typeorm';
export async function softDeleteOne<T>(
  req: CrudRequest,
  getOneOrFail: (req: CrudRequest, shallow?: boolean) => Promise<T>,
  entityType: Type<T>,
  repo: Repository<T>
): Promise<void | T> {
  if (!req.options.routes?.deleteOneBase)
    throw new InternalServerErrorException(
      'Incomplete CrudRequest: missing req.options.routes.deleteOneBase'
    );
  const { returnDeleted } = req.options.routes.deleteOneBase;
  const found = await getOneOrFail(req, returnDeleted);
  const toReturn = returnDeleted
    ? plainToClass(entityType, { ...found })
    : undefined;
  await repo.softRemove(found);
  return toReturn;
}
