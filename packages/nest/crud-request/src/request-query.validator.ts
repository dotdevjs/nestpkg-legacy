/* eslint-disable @typescript-eslint/no-var-requires */
import { RequestQueryException } from '@nestjsx/crud-request/lib/exceptions/request-query.exception';
import { isObject, isStringFull } from '@nestjsx/util';

import { ComparisonOperator, QueryFilter } from './types/request-query.types';

const monkeypatch = require('monkeypatch');

export const comparisonOperatorsList = ['$jsoneq', '$jsoncont'];

const comparisonOperatorsListStr = comparisonOperatorsList.join();

export function validateComparisonOperator(operator: ComparisonOperator) {
  if (!comparisonOperatorsList.includes(operator)) {
    throw new RequestQueryException(
      `Invalid comparison operator. ${comparisonOperatorsListStr} expected`
    );
  }
}

monkeypatch(
  require('@nestjsx/crud-request/lib/request-query.validator'),
  'validateCondition',
  function (
    original: unknown,
    val: QueryFilter,
    cond: 'filter' | 'or' | 'search'
  ) {
    if (!isObject(val) || !isStringFull(val.field)) {
      throw new RequestQueryException(
        `Invalid field type in ${cond} condition. String expected`
      );
    }
    validateComparisonOperator(val.operator);
  }
);
