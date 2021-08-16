import { Global, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

@Global()
@Module({
  imports: [DiscoveryModule],
  exports: [DiscoveryModule],
})
export class NestCoreModule {}
