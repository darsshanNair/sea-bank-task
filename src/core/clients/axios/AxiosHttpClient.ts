import type {AxiosInstance, AxiosResponse, AxiosError} from 'axios';
import axios from 'axios';
import qs from 'query-string';

import {HttpClient, HttpClientOptions, HttpInstanceHeader} from '../HttpClient';
import {ErrorResponse} from '../../data/models/response/ErrorResponse';

class AxiosHttpClient implements HttpClient {
  private getInstance(header?: HttpInstanceHeader): AxiosInstance {
    return axios.create({
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
        ...(header
          ? {
              ...(header.xMasterKey ? {'X-Master-Key': header.xMasterKey} : {}),
            }
          : {}),
      },
    });
  }

  private generateSuccessResponse(response: AxiosResponse) {
    return {
      success: true,
      statusCode: response.status,
      data: response.data,
    };
  }

  private generateErrorResponse(error: AxiosError): ErrorResponse {
    return {
      success: false,
      statusCode: error.response?.status || 400,
      error: error.response?.data || 'Internal Server Error',
    };
  }

  private generatePath(path: string, params?: object) {
    return params ? `${path}?${qs.stringify(params)}` : path;
  }

  get(path: string, options?: HttpClientOptions) {
    return this.getInstance(options?.header)
      .get(this.generatePath(path, options?.params))
      .then(response => this.generateSuccessResponse(response))
      .catch((error: AxiosError) => {
        throw this.generateErrorResponse(error);
      });
  }

  post(path: string, body: object, options?: HttpClientOptions) {
    return this.getInstance(options?.header)
      .post(this.generatePath(path, options?.params), body)
      .then(response => this.generateSuccessResponse(response))
      .catch((error: AxiosError) => {
        throw this.generateErrorResponse(error);
      });
  }

  put(path: string, body: object, options?: HttpClientOptions) {
    return this.getInstance(options?.header)
      .put(this.generatePath(path, options?.params), body)
      .then(response => this.generateSuccessResponse(response))
      .catch(error => {
        throw this.generateErrorResponse(error);
      });
  }

  patch(path: string, body: object, options?: HttpClientOptions) {
    return this.getInstance(options?.header)
      .patch(this.generatePath(path, options?.params), body)
      .then(response => this.generateSuccessResponse(response))
      .catch(error => {
        throw this.generateErrorResponse(error);
      });
  }

  delete(path: string, options?: HttpClientOptions) {
    return this.getInstance(options?.header)
      .delete(path)
      .then(response => this.generateSuccessResponse(response))
      .catch(error => {
        throw this.generateErrorResponse(error);
      });
  }
}

export default AxiosHttpClient;
