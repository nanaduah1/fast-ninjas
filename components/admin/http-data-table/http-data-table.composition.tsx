import React from "react";
import { HttpDataTable } from "./http-data-table";

export const BasicHttpDataTable = () => {
  const columns = [
    { field: "userId", title: "User Id" },
    { field: "id", title: "Id" },
    { field: "title", title: "Title" },
  ];
  const src = "https://jsonplaceholder.typicode.com/todos";
  return <HttpDataTable src={src} columns={columns} />;
};
