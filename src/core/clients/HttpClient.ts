import {BaseResponse} from '../data/models/response/BaseResponse';

export interface HttpClient {
  get(path: string, options?: HttpClientOptions): Promise<BaseResponse<any>>;
  post(
    path: string,
    body: object,
    options?: HttpClientOptions,
  ): Promise<BaseResponse<any>>;
  put(
    path: string,
    body: object,
    options?: HttpClientOptions,
  ): Promise<BaseResponse<any>>;
  patch(
    path: string,
    body: object,
    options?: HttpClientOptions,
  ): Promise<BaseResponse<any>>;
  delete(path: string, options?: HttpClientOptions): Promise<BaseResponse<any>>;
}

export interface HttpClientOptions {
  params?: object;
  header?: HttpInstanceHeader;
}

export interface HttpInstanceHeader {
  xMasterKey?: string;
}
