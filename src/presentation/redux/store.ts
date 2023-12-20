import {configureStore} from '@reduxjs/toolkit';
import transactionsReducer from './slices/TransactionSlice';
import authenticationReducer from './slices/AuthenticationSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    authentication: authenticationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
