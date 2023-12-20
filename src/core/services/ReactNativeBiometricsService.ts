import ReactNativeBiometrics from 'react-native-biometrics';
import {BiometricsService} from './BiometricsService';

export class ReactNativeBiometricsService implements BiometricsService {
  private getInstance(): ReactNativeBiometrics {
    return new ReactNativeBiometrics();
  }
  async isBiometricsAvailable(): Promise<boolean> {
    try {
      const {available} = await this.getInstance().isSensorAvailable();
      return available;
    } catch (error) {
      console.error('Biometrics check failed', error);
      return false;
    }
  }

  async authenticate(): Promise<boolean> {
    try {
      const {success} = await this.getInstance().simplePrompt({
        promptMessage: 'Authenticate to continue',
      });
      return success;
    } catch (error) {
      console.error('Biometric authentication failed', error);
      return false;
    }
  }
}
