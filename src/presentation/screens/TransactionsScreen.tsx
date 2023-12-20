import React, {useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {
  TransactionContainer,
  TransactionItemContainer,
} from '../containers/Containers';
import {TransactionTitle} from '../components/TitleText';
import {TransactionsAmount} from '../components/Amount';
import {TransactionsDescription} from '../components/Description';
import {
  fetchTransactionsList,
  resetTransactionsSlice,
} from '../redux/slices/TransactionSlice';
import {RootState} from '../redux/store';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {Transaction} from '../../core/data/providers/seaBankApi/SeaBankApiProvider';
import {CombinedTransactionsScreenProps} from '../../types/Navigation';

const TransactionsScreen: React.FC<CombinedTransactionsScreenProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(
    (state: RootState) => state.transactions.data,
  );

  const loading = useAppSelector(
    (state: RootState) => state.transactions.loading,
  );

  const authError = useAppSelector(
    (state: RootState) => state.authentication.error,
  );

  useEffect(() => {
    dispatch(fetchTransactionsList());

    return () => {
      dispatch(resetTransactionsSlice());
    };
  }, [dispatch]);

  const navigateToTransactionDetails = (transaction: Transaction) => {
    navigation.navigate('TransactionDetails', {transaction});
  };

  const handleRefresh = () => {
    dispatch(fetchTransactionsList());
  };

  if (loading) {
    return (
      <TransactionContainer>
        <TransactionTitle>Loading...</TransactionTitle>
      </TransactionContainer>
    );
  }

  return (
    <TransactionContainer>
      <TransactionTitle>Transactions</TransactionTitle>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TransactionItemContainer
            onPress={() => {
              navigateToTransactionDetails(item);
            }}>
            <TransactionsAmount>
              {formatMoney(item.amount, authError)}
            </TransactionsAmount>
            <TransactionsDescription>
              {item.description}
            </TransactionsDescription>
          </TransactionItemContainer>
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor="#fff"
          />
        }
      />
    </TransactionContainer>
  );
};

export function formatMoney(money: number, authError: Error | null): string {
  return authError !== null ? 'RM ***' : `RM ${money.toFixed(2)}`;
}

export default TransactionsScreen;
