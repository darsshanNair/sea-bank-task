import {HttpClient} from '../../../clients/HttpClient';
import {BaseResponse} from '../../models/response/BaseResponse';
import {
  SeaBankApiProvider,
  SeaBankResponse,
  TransactionResponse,
} from './SeaBankApiProvider';

class DefaultSeaBankApiProvider implements SeaBankApiProvider {
  private httpClient: HttpClient;
  private baseUrl: string;
  private masterKey: string;

  constructor(httpClient: HttpClient, baseUrl: string, masterKey: string) {
    this.httpClient = httpClient;
    this.baseUrl = baseUrl;
    this.masterKey = masterKey;
  }

  async getTransactionsList(): Promise<
    BaseResponse<SeaBankResponse<TransactionResponse>>
  > {
    const data = await this.httpClient.get(
      `${this.baseUrl}/v3/b/657eb90d266cfc3fde69e801`,
      {
        header: this.getHeaders(this.masterKey),
      },
    );
    return data;
  }

  private getHeaders(masterKey: string) {
    return {
      xMasterKey: masterKey,
    };
  }
}

export default DefaultSeaBankApiProvider;
