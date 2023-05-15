import React, { useEffect, useState } from "react";
import { DataTable } from "@fast-ninjas/admin.data-table";
import useHttp from "@fast-ninjas/hooks.use-http";

export type HttpDataTableProps = {
  /**
   * a node to be rendered in the special component.
   */
  src: string;
  columns: Array<any>;
};

export function HttpDataTable({ src, columns }: HttpDataTableProps) {
  const { get } = useHttp();
  const [data, setData] = useState([]);

  useEffect(() => {
    get(src).then((recs: any) => setData(recs));
  }, []);
  return <DataTable data={data} Columns={columns} />;
}
