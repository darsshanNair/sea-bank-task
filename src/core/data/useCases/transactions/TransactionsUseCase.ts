import {ListTransactions} from '../../providers/seaBankApi/SeaBankApiProvider';

export type GetTransactionsListUseCase = () => Promise<ListTransactions>;
