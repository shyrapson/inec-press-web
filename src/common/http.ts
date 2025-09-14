import axios, { CreateAxiosDefaults } from "axios";
import QueryString from "query-string";

import { IDelete, IGet, IPatch, IPost, IPut } from "./types";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api";

const httpConfig = () => {
  const options: CreateAxiosDefaults = {
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
  };
  const http = axios.create(options);

  const httpMultipart = axios.create({
    ...options,
    headers: { ...options.headers, "Content-Type": "multipart/form-data" },
  });

  http.interceptors.request.use(
    (config) => {
      const localToken: any = window?.localStorage.getItem("auth");
      const token = JSON.parse(localToken)?.token?.accessToken?.token;
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // httpMultipart.interceptors.request.use(
  //   (config) => {
  //     const token = authStore.getState().accessToken?.token;
  //     if (token) config.headers['x-access-token'] = ⁠ Bearer ${token} ⁠;
  //     return config;
  //   },
  //   (error) => Promise.reject(error)
  // );

  return {
    post: async <T>({ url, body }: IPost<unknown>) => {
      const response = await http.post(url, JSON.stringify(body));
      return response.data;
    },

    patch: async <T>({ url, body }: IPatch<T>) => {
      const response = await http.patch(url, JSON.stringify(body));
      return response.data;
    },

    get: async <T>({ url, query }: IGet<T>) => {
      const queryString = `?${QueryString.stringify(query ?? {})}`;
      const Url = QueryString.stringify(query ?? {}) ? `${url + queryString}` : `${url}`;
      const response = await http.get(Url);
      return response.data;
    },

    delete: async ({ url }: IDelete) => {
      const response = await http.delete(url);
      return response.data;
    },

    put: async <T>({ url, body }: IPut<T>) => {
      const response = await http.put(url, JSON.stringify(body));
      return response.data;
    },

    upload: async <T>({ url, body }: IPost<T>) => {
      const response = await httpMultipart.post(url, JSON.stringify(body));
      return response.data;
    },
  };
};

export default httpConfig();
