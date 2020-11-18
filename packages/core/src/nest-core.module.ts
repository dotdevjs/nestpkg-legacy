import { Global, Module } from '@nestjs/common';
import { ModuleRef, NestContainer } from '@nestjs/core';

@Global()
@Module({
  providers: [
    {
      provide: NestContainer,
      useFactory: (m: ModuleRef) => (m as any).container,
      inject: [ModuleRef],
    },
  ],
  exports: [NestContainer],
})
export class NestCoreModule {}
