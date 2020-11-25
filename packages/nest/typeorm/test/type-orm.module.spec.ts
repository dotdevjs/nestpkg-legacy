import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestpkg/typeorm';

describe('TypeOrmModule', () => {
  it('should be defined', () => {
    expect(TypeOrmModule).toBeDefined();
  });

  it('should forTest()', () => {
    expect(
      async () =>
        await Test.createTestingModule({
          imports: [TypeOrmModule.forTest()],
        }).compile()
    ).not.toThrow();
  });

  it('should forRoot()', () => {
    expect(
      async () =>
        await Test.createTestingModule({
          imports: [TypeOrmModule.forRoot()],
        }).compile()
    ).not.toThrow();
  });

  it('should synchronize()', async () => {
    const app = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot()],
    }).compile();
    expect(async () => TypeOrmModule.synchronize(app)).not.toThrow();
    expect(() => TypeOrmModule.synchronize(app)).rejects.not.toThrow();
  });
});
