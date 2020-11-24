import { SFieldOperator as BaseSFieldOperator, SFiledValues } from '@nestjsx/crud-request';

export type SFieldOperator = BaseSFieldOperator & {
  $jsoneq?: SFiledValues;
  $jsoncont?: SFiledValues;
};

export type ComparisonOperator = keyof SFieldOperator;

export type QueryFilter = {
  field: string;
  operator: ComparisonOperator;
  value?: any;
};
