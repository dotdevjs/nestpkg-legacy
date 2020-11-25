import { ParamOption } from '@nestjsx/crud';

export const CRUD_PARAM_UUID_PRIMARY: ParamOption = {
  field: 'uuid',
  type: 'uuid',
  primary: true,
};
