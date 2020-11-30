import { TypeOrmModule } from '@nestpkg/typeorm';

describe('TypeOrmModule', () => {
  it('should be defined', () => {
    expect(TypeOrmModule).toBeDefined();
  });

  // it('should forTest()', async () => {
  //   const module = TypeOrmModule.forTest();
  // });

  // it('should synchronize()', async () => {
  //   const app = await Test.createTestingModule({
  //     imports: [TypeOrmModule.forRoot()],
  //   }).compile();
  //   expect(async () => TypeOrmModule.synchronize(app)).not.toThrow();
  //   expect(() => TypeOrmModule.synchronize(app)).rejects.not.toThrow();
  // });
});
