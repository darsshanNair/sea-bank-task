import {BaseResponse} from '../../models/response/BaseResponse';

export interface SeaBankResponse<T> {
  record: T;
  metadata: SeaBankMetadata;
}

interface SeaBankMetadata {
  id: string;
  private: boolean;
  createdAt: string; //ISO 8601 string
  collectionId: string;
  name: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  description: string;
  date: string; //ISO 8601 string
}

export enum TransactionType {
  Debit = 'debit',
  Credit = 'credit',
}

export type ListTransactions = Transaction[];

export interface TransactionResponse {
  transactions: Transaction[];
}

export interface SeaBankApiProvider {
  getTransactionsList(): Promise<
    BaseResponse<SeaBankResponse<TransactionResponse>>
  >;
}
