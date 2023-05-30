import React from "react"; //
import { DataTable } from "./data-table";

const data = [
  {
    name: "Duah",
    address: "bn-34343",
    job: {
      title: "Ninja 3",
      supervisor: "Bob Smith",
    },
  },
  {
    name: "Rahman",
    address: "bx-34343",
    job: {
      title: "Ninja 3",
      supervisor: "Bob Smith",
    },
  },
  {
    name: "Kojo",
    address: "bz-34343",
    job: {
      title: "Ninja 3",
      supervisor: "Bob Smith",
    },
  },
];
const columns = [
  { field: "name", title: "Full Name" },
  { field: "job.title", title: "Job Title" },
];

export const BasicDataTable = () => {
  return (
    <DataTable
      data={data}
      columns={columns}
      onRowClicked={(row) => console.log("You clicked ", row)}
    />
  );
};
