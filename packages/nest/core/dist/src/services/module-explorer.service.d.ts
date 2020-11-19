import { NestContainer } from '@nestjs/core';
import { Module } from '@nestjs/core/injector/module';
export declare class ModuleExplorer {
    private readonly container;
    constructor(container: NestContainer);
    scan(): Module[];
}
