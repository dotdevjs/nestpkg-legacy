import { Global, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

// TODO: fix
@Global()
@Module({
  imports: [DiscoveryModule],
  exports: [DiscoveryModule],
})
export class NestCoreModule {}
