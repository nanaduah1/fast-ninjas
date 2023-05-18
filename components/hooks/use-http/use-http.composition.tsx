import React from "react";
import useHttp from "./use-http";
import { useEffect } from "react";
import { useState } from "react";

export const BasicUseHttp = () => {
  const { get } = useHttp();
  const [data, setData] = useState([]);

  function loadData() {
    get("https://jsonplaceholder.typicode.com/todos").then((d) => setData(d));
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <button onClick={loadData}>Load Data</button>
      <ol>
        {data.map((d: any, index) => (
          <li key={index}>{d.title}</li>
        ))}
      </ol>
    </div>
  );
};
