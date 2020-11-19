export {
  CrudController,
  Override,
  CrudRequest,
  ParsedRequest,
  ParsedBody,
  CrudActions,
  CrudRequestOptions,
  CrudService,
} from '@nestjsx/crud';

export { R } from '@nestjsx/crud/lib/crud/reflection.helper';
// export { R };

export { CRUD_OPTIONS_METADATA } from '@nestjsx/crud/lib/constants';
// export { CRUD_OPTIONS_METADATA };

export * from './decorators/crud.decorator';
export * from './interfaces/resource.model';
export * from './crud.module';
