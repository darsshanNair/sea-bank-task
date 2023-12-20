import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  background-color: #fff; /* Pearl white */
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  color: #0459e0; /* SeaBank blue */
  font-size: 16px;
  font-weight: bold;
`;

export interface AuthenticateButtonProps {
  onPress: () => void;
}
