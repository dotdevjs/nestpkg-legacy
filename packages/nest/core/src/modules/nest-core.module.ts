import { Global, Module } from '@nestjs/common';
import { ModuleRef, NestContainer } from '@nestjs/core';

import { ModuleExplorer, ServiceExplorer } from '../services';

@Global()
@Module({
  providers: [
    {
      provide: NestContainer,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useFactory: (m: any) => m.container,
      inject: [ModuleRef],
    },
    ServiceExplorer,
    ModuleExplorer,
  ],
  exports: [NestContainer, ServiceExplorer, ModuleExplorer],
})
export class NestCoreModule {}
