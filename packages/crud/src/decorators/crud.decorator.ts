import { Type } from '@nestjs/common';
import {
  Crud as BaseCrud,
  CrudOptions as BaseCrudOptions,
} from '@nestjsx/crud';

export type CrudOptions = {
  serializeAll?: Type<unknown> | false;
} & BaseCrudOptions;

export const Crud = (options?: CrudOptions) => {
  options = {
    query: {
      alwaysPaginate: true,
    },
    routes: {
      createOneBase: {
        returnShallow: true,
      },
      updateOneBase: {
        returnShallow: true,
      },
      replaceOneBase: {
        returnShallow: true,
      },
    },
    serialize: {
      create: options.serializeAll || false,
      createMany: options.serializeAll || false,
      delete: options.serializeAll || false,
      get: options.serializeAll || false,
      getMany: options.serializeAll || false,
      replace: options.serializeAll || false,
      update: options.serializeAll || false,
    },
    ...options,
  };

  return BaseCrud(options);
};
