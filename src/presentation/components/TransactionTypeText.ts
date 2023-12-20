import {TransactionType} from '../../core/data/providers/seaBankApi/SeaBankApiProvider';
import styled from 'styled-components/native';

export const TransactionTypeText = styled.Text<{type: TransactionType}>`
  color: ${props => (props.type === TransactionType.Debit ? 'green' : 'red')};
  font-size: 18px;
`;
