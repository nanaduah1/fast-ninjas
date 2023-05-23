import React from "react"; //
import { DataTable } from "./data-table";

const row = [
  {
    name: "Duah",
    address: "bn-34343",
    title: "Ninja 3",
    onClick: () => console.log("Duah"),
  },
  {
    name: "Rahman",
    address: "bx-34343",
    title: "Ninja 5",
    onClick: () => console.log("Rahman"),
  },
  {
    name: "Kojo",
    address: "bz-34343",
    title: "Ninja 4",
  },
];
const col = [
  { field: "name", title: "Full Name" },
  { field: "title", title: "Job Title" },
];

export const BasicDataTable = () => {
  return <DataTable data={row} columns={col} />;
};
