import React from "react"; //
import { DataTable } from "./data-table";

const data = [
  {
    name: "Duah",
    address: "bn-34343",
    title: "Ninja 3",
   
  },
  {
    name: "Rahman",
    address: "bx-34343",
    title: "Ninja 5",
   
  },
  {
    name: "Kojo",
    address: "bz-34343",
    title: "Ninja 4",
  },
];
const columns = [
  { field: "name", title: "Full Name" },
  { field: "title", title: "Job Title" },
];

export const BasicDataTable = () => {
  return <DataTable data={data} columns={columns} onRowClicked={(row)=>console.log('You clicked ', row)} />;
};
