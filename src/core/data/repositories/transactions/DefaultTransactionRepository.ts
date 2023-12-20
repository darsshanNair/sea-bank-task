import {
  ListTransactions,
  SeaBankApiProvider,
} from '../../providers/seaBankApi/SeaBankApiProvider';
import {TransactionRepository} from './TransactionsRepository';

class DefaultTransactionRepository implements TransactionRepository {
  private seaBankApiProvider: SeaBankApiProvider;

  constructor(seaBankApiProvider: SeaBankApiProvider) {
    this.seaBankApiProvider = seaBankApiProvider;
  }

  async getTransactionsList(): Promise<ListTransactions> {
    const response = await this.seaBankApiProvider.getTransactionsList();

    return response.data.record.transactions;
  }
}

export default DefaultTransactionRepository;
