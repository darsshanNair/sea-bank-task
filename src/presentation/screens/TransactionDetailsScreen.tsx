import React from 'react';
import {DateText} from '../components/Date';
import {TransactionDetailsCard} from '../components/TransactionDetailsCard';
import {TransactionTypeText} from '../components/TransactionTypeText';
import {DetailsAmount} from '../components/Amount';
import {DetailsDescription} from '../components/Description';
import {TransactionDetailsContainer} from '../containers/Containers';
import {TransactionTitle} from '../components/TitleText';
import {CombinedTransactionDetailsScreenProps} from '../../types/Navigation';
import {formatMoney} from './TransactionsScreen';

const TransactionDetailsScreen: React.FC<
  CombinedTransactionDetailsScreenProps
> = ({route}) => {
  const {transaction} = route.params;

  return (
    <TransactionDetailsContainer>
      <TransactionTitle>Transaction Details</TransactionTitle>
      <TransactionDetailsCard>
        <DetailsAmount>{formatMoney(transaction.amount, null)}</DetailsAmount>
        <TransactionTypeText type={transaction.type}>
          {transaction.type}
        </TransactionTypeText>
        <DetailsDescription>{transaction.description}</DetailsDescription>
        <DateText>{transaction.date}</DateText>
      </TransactionDetailsCard>
    </TransactionDetailsContainer>
  );
};

export default TransactionDetailsScreen;
