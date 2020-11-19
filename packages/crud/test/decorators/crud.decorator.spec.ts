import { Crud, CrudOptions, R, CRUD_OPTIONS_METADATA } from '@nestpkg/crud';

describe('Crud', () => {
  it('should be defined', () => {
    expect(Crud).toBeDefined();
  });

  class CrudModel {}

  @Crud({
    model: {
      type: CrudModel,
    },
    serializeAll: false,
  })
  class CrudController {}

  it('should define metadata', () => {
    const metadata: CrudOptions = R.get(CRUD_OPTIONS_METADATA, CrudController);

    expect(metadata).toMatchObject({
      query: {
        alwaysPaginate: true,
      },
      serializeAll: false,
      serialize: {
        get: false,
        getMany: false,
      },
    } as CrudOptions);
  });
});
