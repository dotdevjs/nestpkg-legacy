import * as lodash from 'lodash';
import * as mergeDeep from 'merge-deep';
import { CrudRequest } from '@nestjsx/crud';

import { BaseCrudOptions } from '../decorators/crud.decorator';

const defaults: CrudRequest = {
  options: {
    query: {
      exclude: [],
    },
    routes: {
      getManyBase: { interceptors: [], decorators: [] },
      getOneBase: { interceptors: [], decorators: [] },
      createOneBase: {
        interceptors: [],
        decorators: [],
        returnShallow: false,
      },
      createManyBase: { interceptors: [], decorators: [] },
      updateOneBase: {
        interceptors: [],
        decorators: [],
        allowParamsOverride: false,
        returnShallow: false,
      },
      replaceOneBase: {
        interceptors: [],
        decorators: [],
        allowParamsOverride: false,
        returnShallow: false,
      },
      deleteOneBase: {
        interceptors: [],
        decorators: [],
        returnDeleted: false,
      },
      recoverOneBase: {
        interceptors: [],
        decorators: [],
        returnRecovered: false,
      },
    },
  },
  parsed: {
    fields: [],
    paramsFilter: [],
    authPersist: undefined,
    search: { $and: [] },
    filter: [],
    or: [],
    join: [],
    sort: [],
    limit: undefined,
    offset: undefined,
    page: undefined,
    cache: undefined,
    includeDeleted: undefined,
  },
};

export function createRequest(
  parsed: Partial<CrudRequest['parsed']> = {},
  options: Partial<CrudRequest['options']> = {}
): CrudRequest {
  const req: CrudRequest = mergeDeep(
    { options: BaseCrudOptions },
    lodash.clone(defaults),
    {
      parsed,
      options,
    }
  );
  req.parsed.filter.forEach((item) => {
    // TODO: $or OR $and from options
    req.parsed.search['$and'].push({
      [item.field]: { [item.operator]: item.value },
    });
  });

  return req;
}
