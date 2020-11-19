import { chain } from 'lodash';
import { Injectable } from '@nestjs/common';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { NestContainer } from '@nestjs/core';

@Injectable()
export class ServiceExplorer {
  constructor(private readonly container: NestContainer) {}

  public scan(): InstanceWrapper[] {
    const values = [...this.container.getModules().values()];
    const components = values.map((module) => module.components);

    return chain(
      components.map((component) =>
        [...component.values()].filter(
          ({ metatype }: InstanceWrapper) => !!metatype
        )
      )
    )
      .flattenDeep()
      .compact()
      .value();
  }
}
