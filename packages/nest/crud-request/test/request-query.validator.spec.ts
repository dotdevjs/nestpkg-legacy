import '@nestpkg/crud-request';

import {
  ComparisonOperator,
  comparisonOperatorsList,
  validateComparisonOperator,
} from '@nestpkg/crud-request';

describe('validateComparisonOperator', () => {
  it('should fail with invalid operator', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => validateComparisonOperator('$jsoninvalid' as any)).toThrow();
  });

  it('should pass with valid operator', () => {
    for (const idx in comparisonOperatorsList) {
      expect(() =>
        validateComparisonOperator(
          comparisonOperatorsList[idx] as ComparisonOperator
        )
      ).not.toThrow();
    }
  });
});
