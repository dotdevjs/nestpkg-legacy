import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { NestContainer } from '@nestjs/core';
export declare class ServiceExplorer {
    private readonly container;
    constructor(container: NestContainer);
    scan(): InstanceWrapper[];
}
