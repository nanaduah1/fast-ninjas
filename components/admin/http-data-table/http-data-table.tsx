import React, { useEffect, useState } from "react";
import { DataTable } from "@fast-ninjas/admin.data-table";
import { Column } from "@fast-ninjas/admin.data-table/util";
import useHttp from "@fast-ninjas/hooks.use-http";

export type HttpDataTableProps = {
  src: string;
  columns: Column[];
};

export function HttpDataTable({ src, columns }: HttpDataTableProps) {
  const { get } = useHttp();
  const [data, setData] = useState([]);

  useEffect(() => {
    get(src)
      .then((recs: any) => recs.json())
      .then((json) => {
        console.log(json);
        setData(json);
      });
  }, []);
  return <DataTable data={data} Columns={columns} />;
}
