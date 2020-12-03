import '@nestpkg/crud-request';

export {
  CrudController,
  Override,
  CrudRequest,
  ParsedRequest,
  ParsedBody,
  CrudActions,
  CrudRequestOptions,
  CrudService,
  GetManyDefaultResponse,
} from '@nestjsx/crud';
export { R } from '@nestjsx/crud/lib/crud/reflection.helper';
export { CRUD_OPTIONS_METADATA } from '@nestjsx/crud/lib/constants';

export * from './crud.constants';
export * from './constraints/is-valid-entity.constraint';
export * from './decorators/crud.decorator';
export * from './interfaces/resource.model';
export * from './crud.module';
