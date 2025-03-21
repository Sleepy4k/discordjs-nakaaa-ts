import axios, { AxiosInstance } from "axios";

export default function(host: string, ...args: any): AxiosInstance {
  return axios.create({
    baseURL: host,
    ...args
  });
}
