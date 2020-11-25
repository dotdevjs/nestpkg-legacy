/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { ComparisonOperator, RequestQueryException } from '@nestpkg/crud-request';

const monkeypatch = require('monkeypatch');

export const comparisonOperatorsList = ['$jsoneq', '$jsoncont'];

const comparisonOperatorsListStr = comparisonOperatorsList.join();

monkeypatch(
  require('@nestjsx/crud-request/lib/request-query.validator'),
  'validateComparisonOperator',
  function (original: any, operator: ComparisonOperator) {
    try {
      return original();
    } catch (e) {
      if (!comparisonOperatorsList.includes(operator)) {
        throw new RequestQueryException(
          `Invalid comparison operator. ${comparisonOperatorsListStr} expected`
        );
      }
    }
  }
);
