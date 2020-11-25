import '@nestpkg/crud-request';

import { validateComparisonOperator } from '@nestjsx/crud-request/lib/request-query.validator';

describe('validateComparisonOperator', () => {
  it('should pass', () => {
    expect(() => validateComparisonOperator('$jsoninvalid' as any)).toThrow();
    expect(() => validateComparisonOperator('$jsoneq' as any)).not.toThrow();
  });
});
