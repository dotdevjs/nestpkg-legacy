import { Test, TestingModule } from '@nestjs/testing';
import { NestCoreModule } from '@nestpkg/core';
import { EntityProvider, EntityProviderService } from '@nestpkg/typeorm';
import { Module } from '@nestjs/common';

describe('EntityProviderService', () => {
  class Entity {}

  @Module({})
  @EntityProvider(Entity)
  class EntityProviderModule {}

  it('should be defined', () => {
    expect(EntityProviderService).toBeDefined();
  });

  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [NestCoreModule, EntityProviderModule],
      //providers: [EntityProviderService],
    }).compile();
  });

  it('test', () => {
    const service: EntityProviderService = module.get(EntityProviderService);
    expect(service.getEntities().length).toBe(1);
  });
});
