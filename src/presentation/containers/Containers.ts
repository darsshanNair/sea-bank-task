import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const MainContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #0459e0;
  justify-content: center;
  align-items: center;
`;

export const TransactionContainer = styled.View`
  flex: 1;
  background-color: #0459e0;
  padding: 16px;
`;

export const TransactionDetailsContainer = styled.View`
  flex: 1;
  background-color: #0459e0;
  padding: 16px;
`;

export const TransactionItemContainer = styled(TouchableOpacity)`
  background-color: #fff;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 10px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

export const Content = styled.View`
  align-items: center;
`;
