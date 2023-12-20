import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ListTransactions} from '../../../core/data/providers/seaBankApi/SeaBankApiProvider';
import {GetTransactionsListUseCase} from '../../../core/data/useCases/transactions/TransactionsUseCase';
import {TransactionState} from '../states/TransactionState';
import {USECASE_TYPES} from '../../../inversify.config';
import {container} from '../../../container';

export const fetchTransactionsList = createAsyncThunk<ListTransactions>(
  'transactions/fetchTransactionsList',
  async (_, {rejectWithValue}) => {
    try {
      const data = await container.get<GetTransactionsListUseCase>(
        USECASE_TYPES.GetTransactionsList,
      )();

      return data;
    } catch (error: any) {
      throw rejectWithValue(error);
    }
  },
);

const initialState: TransactionState = {
  loading: true,
  data: null,
  error: null,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    resetTransactionsSlice: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTransactionsList.pending, state => {
      state.loading = true;
      state.data = null;
      state.error = null;
    });
    builder.addCase(fetchTransactionsList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchTransactionsList.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload as Error;
    });
  },
});

export const {resetTransactionsSlice} = transactionsSlice.actions;

export default transactionsSlice.reducer;
