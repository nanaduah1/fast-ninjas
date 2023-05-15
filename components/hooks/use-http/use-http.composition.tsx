import React from "react";
import useHttp from "./use-http";

export const BasicUseHttp = () => {
  const { get } = useHttp();
  return <div>hello world!</div>;
};
