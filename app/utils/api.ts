import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: '',
});

api.interceptors.request.use((param: AxiosRequestConfig) => ({
  ...param,
  baseURL: '',
}));

/**
 *
 * @template T - type.
 * @param {AxiosResponse<T>} response - axios response.
 * @returns {T} - expected object.
 */
const success = <T>(response: AxiosResponse<T>): T => {
  if (response.headers['content-type'] === 'application/octet-stream') {
    const contentDisposition = response.headers['content-disposition'];
    const originalFileName = contentDisposition.split('filename=')[1];
    const filename = originalFileName ? originalFileName.trim() : 'download';
    const url = window.URL.createObjectURL(
      new Blob([(response.data as unknown) as BlobPart]),
    );
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }

  return response.data;
};

const error = (err: AxiosError<Error>): AxiosError<Error> => {
  throw err;
};

/**
 * HTTP GET method, used to fetch data `statusCode`: 200.
 *
 * @access public
 * @template T - `TYPE`: expected object.
 * @template R - `RESPONSE`: expected object inside a axios response format.
 * @param {string} url - endpoint you want to reach.
 * @param {AxiosRequestConfig} [config] - axios request configuration.
 * @returns {Promise<T>} HTTP `axios` response payload.
 */
export const get = <T, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => api.get(url, config).then(success).catch(error);
