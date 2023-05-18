import React from "react";
import { useCache } from "./use-cache";

export const BasicuseCache = () => {
  const cache = useCache();
  const getLatest = () => {
    cache.getOrSet("my-key", () => {
      console.log("Loading from source");
      return 4000;
    });
  };

  return (
    <div>
      <button onClick={getLatest} style={{ marginRight: "2px" }}>
        Use Cache
      </button>
    </div>
  );
};
