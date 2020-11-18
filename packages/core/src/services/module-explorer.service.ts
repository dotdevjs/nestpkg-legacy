import { Injectable } from '@nestjs/common';
import { NestContainer } from '@nestjs/core';
import { Module } from '@nestjs/core/injector/module';

@Injectable()
export class ModuleExplorer {
  constructor(private readonly container: NestContainer) {}

  public scan(): Module[] {
    return [...this.container.getModules().values()];
  }
}
