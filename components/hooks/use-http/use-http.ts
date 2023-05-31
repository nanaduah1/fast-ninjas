import { useCallback } from "react";
import { useState } from "react";
import { useCache } from "@fast-ninjas/hooks.use-cache";

export const AccessDeniedError = "AccessDeniedError";
export const UnAuthorizedError = "UnAuthorizedError";

type HttpHeaderConfig = { [key: string]: string };

export default function useHttp() {
  const cache = useCache(15);
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (
      url: string,
      method: string = "GET",
      data?: any,
      headers?: HttpHeaderConfig
    ) => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: data ? JSON.stringify(data) : undefined,
        });

        setLoading(false);
        if (response.status === 401) throw AccessDeniedError;
        if (response.status === 403) throw UnAuthorizedError;

        return response;
      } catch (err) {
        setLoading(false);
        throw err;
      }
    },
    [setLoading]
  );

  const post = useCallback(
    async (url: string, data: any, headers?: HttpHeaderConfig) =>
      request(url, "POST", data, headers),
    [request]
  );

  const put = useCallback(
    async (url: string, data: any, headers?: HttpHeaderConfig) =>
      request(url, "PUT", data, headers),
    [request]
  );

  const get = useCallback(
    async (
      url: string,
      headers?: HttpHeaderConfig,
      cacheTimeoutSeconds?: number
    ) => {
      return await cache.getOrSet(
        url,
        async () => {
          const resp = await request(url, "GET", null, headers);
          return await resp.json();
        },
        cacheTimeoutSeconds
      );
    },
    [request, cache]
  );

  const patch = useCallback(
    async (url: string, data: any, headers?: HttpHeaderConfig) =>
      request(url, "PATCH", data, headers),
    [request]
  );

  const httpDelete = useCallback(
    async (url: string, headers?: HttpHeaderConfig) =>
      request(url, "DELETE", null, headers),
    [request]
  );

  return {
    get,
    post,
    put,
    patch,
    httpDelete,
    loading,
  };
}
