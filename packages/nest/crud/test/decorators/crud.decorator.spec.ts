import { Crud, CrudOptions, R, CRUD_OPTIONS_METADATA } from '@nestpkg/crud';

describe('CrudDecorator', () => {
  it('should be defined', () => {
    expect(Crud).toBeDefined();
  });

  class CrudModel {}

  const crudOptions: CrudOptions = {
    model: {
      type: CrudModel,
    },
    serializeAll: CrudModel,
    query: {
      join: {
        test: {
          eager: true,
        },
      },
    },
  };

  @Crud(crudOptions)
  class CrudController {}

  it('should define metadata', () => {
    const metadata: CrudOptions = R.get(CRUD_OPTIONS_METADATA, CrudController);

    expect(metadata).toMatchObject({
      ...crudOptions,
      serialize: {
        get: CrudModel,
        getMany: CrudModel,
      },
    } as Partial<CrudOptions>);
  });
});
