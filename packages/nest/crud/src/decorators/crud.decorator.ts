import { Type } from '@nestjs/common';
import {
  Crud as BaseCrud,
  CrudOptions as BaseCrudOptions,
} from '@nestjsx/crud';
import * as fp from 'lodash/fp';

export type CrudOptions = {
  serializeAll?: Type<unknown> | false;
} & BaseCrudOptions;

export const Crud = (options?: CrudOptions) => {
  const defaultOptions: Partial<CrudOptions> = {
    // query: {
    //   alwaysPaginate: true,
    // },
    // routes: {
    //   createOneBase: {
    //     returnShallow: true,
    //   },
    //   updateOneBase: {
    //     returnShallow: true,
    //   },
    //   replaceOneBase: {
    //     returnShallow: true,
    //   },
    // },
    serialize: {
      create: options.serializeAll ?? options?.serialize?.create,
      createMany: options.serializeAll ?? options?.serialize?.createMany,
      delete: options.serializeAll ?? options?.serialize?.delete,
      get: options.serializeAll ?? options?.serialize?.get,
      getMany: options.serializeAll ?? options?.serialize?.getMany,
      replace: options.serializeAll ?? options?.serialize?.replace,
      update: options.serializeAll ?? options?.serialize?.update,
    },
  };

  options = fp.merge(defaultOptions, options);

  return BaseCrud(options);
};
