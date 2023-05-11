import React from 'react';
import { render } from '@testing-library/react';
import { BasicDataTable } from './data-table.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicDataTable />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
