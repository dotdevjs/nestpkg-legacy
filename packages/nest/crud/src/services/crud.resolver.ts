/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from '@nestjs/common';
import { CrudOptions, CrudRequest, CrudService } from '@nestjsx/crud';
import { Repository } from 'typeorm';
import * as lodash from 'lodash';
import deepMerge from 'merge-deep';

import * as Crud from '../types/crud.types';
import { createRequest } from '../factory/crud-request.factory';
import { BaseEntity } from '../model/base-entity.model';
import { QueryFilter } from '../export';

const mapParsedValues = (filter: QueryFilter[]): Record<string, any> => {
  const result: Record<string, any> = {};
  const data = lodash.keyBy(lodash.clone(filter), (v) => v.field);
  const values = lodash.mapValues(data, (v) => v.value);
  lodash.forEach(values, (val, name) => {
    lodash.set(result, name, val);
  });

  return result;
};

export class CrudResolver<T = Type<BaseEntity>> {
  constructor(
    private readonly crud: CrudService<T>,
    private readonly options: CrudOptions
  ) {}

  createArgs(
    parsed: Partial<CrudRequest['parsed']> = {},
    options: Partial<CrudRequest['options']> = {}
  ): CrudRequest {
    return createRequest(parsed, deepMerge(this.options, options));
  }
  async find(id: string): Promise<T> {
    return this.repo.findOne(id);
  }
  async paginate(args: Crud.GetManyArgs, options: Partial<CrudOptions> = {}) {
    const req = this.createArgs(args, options);

    return this.crud.getMany(req);
  }
  async save<Dto = Type<BaseEntity>>(input: Dto) {
    const { id } = input as any;

    if (id) {
      return this.doUpdate(input);
    }

    return this.doCreate(input);
  }

  async deleteMany(ids: string[]): Promise<number> {
    if (ids.length === 0) {
      return 0;
    }

    const { affected } = await this.repo.delete(ids);

    return affected;
  }

  private get repo(): Repository<T> {
    const { repo } = this.crud as any;
    return repo;
  }

  private doUpdate(rawInput: any) {
    const { id } = rawInput as any;

    const req = this.createArgs({
      paramsFilter: [{ field: 'id', operator: '$eq', value: id }],
    });

    return this.crud.updateOne(req, rawInput);
  }

  private doCreate(rawInput: any) {
    return this.crud.createOne(this.createArgs(), rawInput);
  }

  static mapRequest(req: CrudRequest): Record<string, Record<string, any>> {
    return {
      filter: mapParsedValues(req.parsed.filter),
      paramsFilter: mapParsedValues(req.parsed.paramsFilter),
    };
  }

  static factory<T = Type<BaseEntity>>(
    crud: CrudService<T>,
    options: Partial<CrudOptions> = {}
  ) {
    return new CrudResolver<T>(crud, options as CrudOptions);
  }
}
