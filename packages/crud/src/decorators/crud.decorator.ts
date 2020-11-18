import { Crud as BaseCrud, CrudOptions } from '@nestjsx/crud';

export const Crud = (options?: CrudOptions) => {
  options = {
    query: {
      alwaysPaginate: true,
    },
    ...options,
  };

  return BaseCrud(options);
};
