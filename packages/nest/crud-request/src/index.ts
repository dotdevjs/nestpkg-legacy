import { validateComparisonOperator } from '@nestjsx/crud-request/lib/request-query.validator';

const monkeypatch = require('monkeypatch');

monkeypatch(validateComparisonOperator, 'validateComparisonOperator', function (
  original: any
) {
  console.log('validateComparisonOperator');
  return original();
});

export * from './types/request-query.types';
