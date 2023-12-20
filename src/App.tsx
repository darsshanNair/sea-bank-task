import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {Provider as InversifyProvider} from 'inversify-react';
import {NavigationContainer} from '@react-navigation/native';
import {container} from './container';
import {store} from './presentation/redux/store';
import MainStack from './NavigationStacks';

const App = (): React.JSX.Element => (
  <NavigationContainer>
    <MainStack />
  </NavigationContainer>
);

const AppWithProviders = (): React.JSX.Element => (
  <ReduxProvider store={store}>
    <InversifyProvider container={() => container}>
      <App />
    </InversifyProvider>
  </ReduxProvider>
);

export default AppWithProviders;
