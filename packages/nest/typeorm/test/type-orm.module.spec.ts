import { TypeOrmModule } from '@nestpkg/typeorm';

describe('TypeOrmModule', () => {
  it('should be defined', () => {
    expect(TypeOrmModule).toBeDefined();
    expect(() => TypeOrmModule.forRoot()).not.toThrow();
    expect(() => TypeOrmModule.forTest()).not.toThrow();
  });
});
