import { flattenDeep, compact } from 'lodash';
import { ModuleExplorer } from '@nestpkg/core';
import { Module } from '@nestjs/core/injector/module';

import { METADATA_ENTITY_PROVIDER } from '../type-orm.constants';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EntityProviderService {
  constructor(private readonly moduleExplorer: ModuleExplorer) {}

  getEntities() {
    const modules = this.moduleExplorer.scan();
    const entities = modules.map((m: Module) => {
      const metatype = (m as any)._metatype;
      const entities = Reflect.getMetadata(METADATA_ENTITY_PROVIDER, metatype);
      return entities || [];
    });

    return compact(flattenDeep(entities));
  }
}
