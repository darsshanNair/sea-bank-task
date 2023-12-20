import {Transaction} from '../../../core/data/providers/seaBankApi/SeaBankApiProvider';

export interface TransactionState {
  loading: boolean;
  data: Transaction[] | null;
  error: Error | null;
}
