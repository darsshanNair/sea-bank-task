export interface BiometricsService {
  isBiometricsAvailable(): Promise<boolean>;
  authenticate(): Promise<boolean>;
}
