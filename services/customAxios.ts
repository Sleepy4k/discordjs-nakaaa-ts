/**
 * Coding service by Sleepy4k <sarahpalastring@gmail.com>
 *
 * Reselling this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by:
 * Apri Pandu Wicaksono
 *
 * Link: https://github.com/sleepy4k
 *
 * March 12, 2023
 */
import axios, { AxiosInstance } from "axios";

/**
 * Create custom axios instance
 * 
 * @param {string} host
 * @param {any} args 
 * 
 * @returns {AxiosInstance}
 */
export default function(host: string, ...args: any): AxiosInstance {
  return axios.create({
    baseURL: host,
    ...args
  })
}
