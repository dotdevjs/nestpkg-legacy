import { Test, TestingModule } from '@nestjs/testing';
import { NestCoreModule, ServiceExplorer } from '@nestpkg/core';

describe('ServiceExplorer', () => {
  it('should be defined', () => {
    expect(ServiceExplorer).toBeDefined();
  });

  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [NestCoreModule],
      providers: [ServiceExplorer],
      exports: [ServiceExplorer],
    }).compile();
  });

  it('should return all container services', () => {
    const serviceExplorer = module.get(ServiceExplorer);
    expect(serviceExplorer).toBeInstanceOf(ServiceExplorer);
    expect(() => serviceExplorer.scan()).not.toThrow();
  });
});
