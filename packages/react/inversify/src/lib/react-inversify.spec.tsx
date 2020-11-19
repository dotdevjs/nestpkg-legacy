import React from 'react';
import { render } from '@testing-library/react';

import ReactInversify from './react-inversify';

describe('ReactInversify', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactInversify />);
    expect(baseElement).toBeTruthy();
  });
});
