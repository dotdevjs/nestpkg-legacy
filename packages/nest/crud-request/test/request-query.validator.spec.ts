import '@nestpkg/crud-request';

import { validateComparisonOperator } from '@nestpkg/crud-request';

describe('validateComparisonOperator', () => {
  it('should validateComparisonOperator with $json', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => validateComparisonOperator('$jsoninvalid' as any)).toThrow();
    expect(() => validateComparisonOperator('$jsoneq')).not.toThrow();
  });
});
