import { Global, Module } from '@nestjs/common';
import { ModuleRef, NestContainer } from '@nestjs/core';

import { ModuleExplorer, ServiceExplorer } from '../services';

@Global()
@Module({
  providers: [
    {
      provide: NestContainer,
      useFactory: (moduleRef: { container: NestContainer }) =>
        moduleRef.container,
      inject: [ModuleRef],
    },
    ServiceExplorer,
    ModuleExplorer,
  ],
  exports: [NestContainer, ServiceExplorer, ModuleExplorer],
})
export class NestCoreModule {}
