import {ListTransactions} from '../../providers/seaBankApi/SeaBankApiProvider';
import {TransactionRepository} from '../../repositories/transactions/TransactionsRepository';
import {convertISOToReadableFormat} from './transactionsHelper';

export const getTransactionsListUseCase = async (
  transactionRepository: TransactionRepository,
): Promise<ListTransactions> => {
  const transactionsList = await transactionRepository.getTransactionsList();

  return transactionsList.map(transaction => ({
    ...transaction,
    date: convertISOToReadableFormat(transaction.date),
  }));
};
