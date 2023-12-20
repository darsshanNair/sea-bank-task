import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Transaction} from '../core/data/providers/seaBankApi/SeaBankApiProvider';

interface TransactionDetailsProps {
  transaction: Transaction;
}

export type RootStackParamList = {
  Landing: undefined;
  Transactions: undefined;
  TransactionDetails: TransactionDetailsProps;
};

/**
 * Landing
 */
type LandingScreenRouteProp = RouteProp<RootStackParamList, 'Landing'>;

type LandingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Landing'
>;

export type CombinedLandingScreenProps = {
  route: LandingScreenRouteProp;
  navigation: LandingScreenNavigationProp;
};

/**
 * Transactions
 */
type TransactionsScreenRouteProp = RouteProp<
  RootStackParamList,
  'Transactions'
>;

type TransactionsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Transactions'
>;

export type CombinedTransactionsScreenProps = {
  route: TransactionsScreenRouteProp;
  navigation: TransactionsScreenNavigationProp;
};

/**
 * Transaction details
 */
type TransactionDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'TransactionDetails'
>;
type TransactionDetailsScreenNavigationProp = {
  route: TransactionDetailsScreenRouteProp;
};

export type CombinedTransactionDetailsScreenProps =
  TransactionDetailsScreenNavigationProp;
