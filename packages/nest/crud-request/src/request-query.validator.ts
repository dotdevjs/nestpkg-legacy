/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { RequestQueryException } from '@nestjsx/crud-request/lib/exceptions/request-query.exception';

import { ComparisonOperator } from './types/request-query.types';

const monkeypatch = require('monkeypatch');

export const comparisonOperatorsList = ['$jsoneq', '$jsoncont'];

const comparisonOperatorsListStr = comparisonOperatorsList.join();

// delete require.cache[
//   require.resolve('@nestjsx/crud-request/lib/request-query.validator')
// ];

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
