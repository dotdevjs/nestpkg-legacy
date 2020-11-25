import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestpkg/typeorm';

describe('TypeOrmModule', () => {
  // let app: INestApplication;
  // beforeAll(async () => {
  //   const moduleRef = await Test.createTestingModule({
  //     imports: [TypeOrmModule.forRoot()],
  //   }).compile();

  //   app = moduleRef.createNestApplication(undefined, {
  //     logger: true,
  //   });

  //   await app.init();
  // });

  it('should be defined', async () => {
    expect(TypeOrmModule).toBeDefined();

    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot()],
    }).compile();
    console.log(TypeOrmModule.synchronize(moduleRef));

    // expect(() => TypeOrmModule.forRoot()).not.toThrow();
    // expect(() => TypeOrmModule.forTest()).not.toThrow();
  });
});
