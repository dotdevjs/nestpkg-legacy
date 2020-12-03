import { validate } from 'class-validator';
import { Connection, Repository } from 'typeorm';
import { IsValidEntity, IsValidEntityConstraint } from '@nestpkg/crud';
import { TypeOrmModule } from '@nestpkg/typeorm';
import { ValidatorModule } from '@nestpkg/core';
import { Test, TestEntityFixture, TestingModule } from '@nestpkg/testing';

describe('IsValidEntityConstraint', () => {
  it('should be defined', () => {
    expect(IsValidEntityConstraint).toBeDefined();
  });

  class IsValidEntityDto {
    @IsValidEntity({
      entity: TestEntityFixture,
    })
    testEntity: TestEntityFixture;
  }

  let moduleRef: TestingModule, repository: Repository<TestEntityFixture>;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ValidatorModule,
        TypeOrmModule.forTest({
          entities: [TestEntityFixture],
        }),
      ],
      providers: [IsValidEntityConstraint],
    }).compile();

    await moduleRef.init();

    repository = moduleRef.get(Connection).getRepository(TestEntityFixture);
  });

  afterAll(async () => await moduleRef.close());

  it('should throw exception with invalid entity value', async () => {
    const dto = new IsValidEntityDto();
    dto.testEntity = null;
    await expect(async () => await validate(dto)).rejects.toThrow();
  });

  it('should load related entity value', async () => {
    const testEntity = await repository.save(new TestEntityFixture());
    const dto = new IsValidEntityDto();
    dto.testEntity = testEntity;
    await expect(async () => await validate(dto)).not.toThrow();
  });
});
