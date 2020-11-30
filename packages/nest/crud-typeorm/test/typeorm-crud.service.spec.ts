import {
  mapJsonOperatorsToQuery,
  TypeOrmCrudService,
} from '@nestpkg/crud-typeorm';

describe('TypeOrmCrudService', () => {
  it('should be defined', () => {
    expect(TypeOrmCrudService).toBeDefined();
  });

  it('mapOperatorsToQuery', () => {
    const result = mapJsonOperatorsToQuery(
      {
        field: 'attributes',
        operator: '$jsoneq',
        value: 'demo$hello',
      },
      'attributes',
      'attributes'
    );
    expect(result).toEqual({
      str: 'JSON_EXTRACT(attributes, "$.demo") = :attributes',
      params: { attributes: 'hello' },
    });
  });
});
