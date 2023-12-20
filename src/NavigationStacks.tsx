import React from 'react';
import TransactionsScreen from './presentation/screens/TransactionsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './presentation/screens/LandingScreen';
import TransactionDetailsScreen from './presentation/screens/TransactionDetailsScreen';
import {RootStackParamList} from './types/Navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TransactionDetails"
        component={TransactionDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
