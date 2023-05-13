import React from "react"; //
import { DataTable } from "./data-table";

export const BasicDataTable = () => {
  const row = [
    { name: "Duah", address: "bn-34343", title: "Ninja 3" },
    { name: "Rahman", address: "bx-34343", title: "Ninja 5" },
    { name: "Kojo", address: "bz-34343", title: "Ninja 4" },
  ];
  const col = [
    { field: "name", title: "Full Name" },
    { field: "title", title: "Job Title" },
  ];
  return <DataTable data={row} Columns={col} />;
};
