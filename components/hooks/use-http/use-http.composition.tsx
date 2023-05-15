import React from "react";
import useHttp from "./use-http";
import { useEffect } from "react";
import { useState } from "react";

export const BasicUseHttp = () => {
  const { get } = useHttp();
  const [data, setData] = useState([]);

  useEffect(() => {
    get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  return (
    <div>
      <ol>
        {data.map((d: any) => (
          <li key={d.userId}>{d.title}</li>
        ))}
      </ol>
    </div>
  );
};
