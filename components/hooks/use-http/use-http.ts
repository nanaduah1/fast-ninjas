export const AccessDeniedError = "AccessDeniedError";
export const UnAuthorizedError = "UnAuthorizedError";

type HttpHeaderConfig = { [key: string]: string };

export default function useHttp() {
  const request = async (
    url: string,
    method: string = "GET",
    data?: any,
    headers?: HttpHeaderConfig
  ) => {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (response.status === 401) throw AccessDeniedError;
    if (response.status === 403) throw UnAuthorizedError;

    return response;
  };

  const post = async (url: string, data: any, headers?: HttpHeaderConfig) =>
    request(url, "POST", data, headers);
  const put = async (url: string, data: any, headers?: HttpHeaderConfig) =>
    request(url, "PUT", data, headers);
  const get = async (url: string, headers?: HttpHeaderConfig) =>
    request(url, "GET", null, headers);
  const patch = async (url: string, data: any, headers?: HttpHeaderConfig) =>
    request(url, "PATCH", data, headers);

  const httpDelete = async (url: string, headers?: HttpHeaderConfig) =>
    request(url, "DELETE", null, headers);

  return {
    get,
    post,
    put,
    patch,
    httpDelete,
  };
}
