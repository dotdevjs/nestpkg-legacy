/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { RequestQueryException } from '@nestjsx/crud-request/lib/exceptions/request-query.exception';
import { isObject, isStringFull } from '@nestjsx/util';

import { ComparisonOperator, QueryFilter } from './types/request-query.types';

// import * as RequestQueryValidatorExport from '@nestjsx/crud-request/lib/request-query.validator';
// import * as T from '@nestjsx/crud-request/lib/request-query.';
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

// delete require.cache[
//   require.resolve('@nestjsx/crud-request/lib/request-query.builder')
// ];

// delete require.cache[
//   require.resolve('@nestjsx/crud-request/lib/request-query.parser')
// ];

// delete require.cache[
//   require.resolve('@nestjsx/crud-request/lib/request-query.validator')
// ];

// delete require.cache[require.resolve('@nestjsx/crud-request')];

// monkeypatch(
//   require('@nestjsx/crud-request/lib/request-query.validator'),
//   'validateComparisonOperator',
//   function (original: any, operator: ComparisonOperator) {
//     try {
//       return original(operator);
//     } catch (e) {
//       validateComparisonOperator(operator);
//     }
//   }
// );

// console.log(
//   (require('@nestjsx/crud-request/lib/request-query.validator') as any)
//     .validateCondition
// );

monkeypatch(
  //RequestQueryValidatorExport,
  require('@nestjsx/crud-request/lib/request-query.validator'),
  'validateCondition',
  function (original: any, val: QueryFilter, cond: 'filter' | 'or' | 'search') {
    if (!isObject(val) || !isStringFull(val.field)) {
      throw new RequestQueryException(
        `Invalid field type in ${cond} condition. String expected`
      );
    }
    validateComparisonOperator(val.operator);
  }
);
