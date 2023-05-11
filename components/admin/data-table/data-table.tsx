import React, { ReactNode } from 'react';

export type DataTableProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function DataTable({ children }: DataTableProps) {
  return (
    <div>
      {children}
    </div>
  );
}
