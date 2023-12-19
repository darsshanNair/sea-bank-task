export interface BaseResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
}
