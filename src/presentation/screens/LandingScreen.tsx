import React from 'react';
import {Alert} from 'react-native';
import {
  AuthenticateButtonProps,
  Button,
  ButtonText,
} from '../components/Button';
import {LandingTitle} from '../components/TitleText';
import {MainContainer, Content} from '../containers/Containers';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {authenticateWithBiometrics} from '../redux/slices/AuthenticationSlice';
import {RootState} from '../redux/store';
import {CombinedLandingScreenProps} from '../../types/Navigation';

const LandingScreen: React.FC<CombinedLandingScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(
    (state: RootState) => state.authentication.loading,
  );

  const handleAuthenticate = async () => {
    const result = await dispatch(authenticateWithBiometrics());
    const {type} = result;

    if (type.endsWith('/rejected')) {
      showAuthenticationFailedAlert();
    } else {
      navigation.navigate('Transactions');
    }
  };

  const showAuthenticationFailedAlert = () => {
    Alert.alert(
      'Authentication failed',
      'Do you still want to proceed?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            navigation.navigate('Transactions');
          },
        },
      ],
      {cancelable: false},
    );
  };

  if (loading) {
    return (
      <MainContainer>
        <LandingTitle>Loading...</LandingTitle>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <Content>
        <Title />
        <AuthenticateButton
          onPress={() => {
            handleAuthenticate();
          }}
        />
      </Content>
    </MainContainer>
  );
};

const Title = () => <LandingTitle>SeaBank</LandingTitle>;

const AuthenticateButton: React.FC<AuthenticateButtonProps> = ({onPress}) => {
  return (
    <Button onPress={onPress}>
      <ButtonText>Authenticate to Proceed</ButtonText>
    </Button>
  );
};

export default LandingScreen;
