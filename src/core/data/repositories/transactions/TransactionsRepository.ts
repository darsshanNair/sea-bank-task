import {ListTransactions} from '../../providers/seaBankApi/SeaBankApiProvider';

export interface TransactionRepository {
  getTransactionsList(): Promise<ListTransactions>;
}
