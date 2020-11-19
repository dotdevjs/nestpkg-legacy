import { Test, TestingModule } from '@nestjs/testing';
import { NestCoreModule, ModuleExplorer } from '@nestpkg/core';

describe('ModuleExplorer', () => {
  it('should be defined', () => {
    expect(ModuleExplorer).toBeDefined();
  });

  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [NestCoreModule],
    }).compile();
  });

  it('should return all modules', () => {
    const serviceExplorer = module.get(ModuleExplorer);
    expect(serviceExplorer).toBeInstanceOf(ModuleExplorer);
    expect(() => serviceExplorer.scan()).not.toThrow();
  });
});
