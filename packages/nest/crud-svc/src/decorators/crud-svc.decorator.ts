import { R, CrudOptions } from '@nestpkg/crud';

// import { CrudRoutesFactory } from '../crud/crud-routes.factory';

export function CrudSvc(options: CrudOptions): ClassDecorator {
  return (target) => {
    const options = R.getCrudOptions(target);
    console.log(options);
  };
}
