import '@nestpkg/crud-request';

import { validateComparisonOperator } from '@nestjsx/crud-request/lib/request-query.validator';

describe('validateComparisonOperator', () => {
  it('should validateComparisonOperator with $json', () => {
    expect(() => validateComparisonOperator('$jsoninvalid' as any)).toThrow();
    expect(() => validateComparisonOperator('$jsoneq' as any)).not.toThrow();
  });
});
