import React from 'react';
import { render } from '@testing-library/react';
import { BasicHttpDataTable } from './http-data-table.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicHttpDataTable />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
