import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {container} from '../../../container';
import {BiometricsService} from '../../../core/services/BiometricsService';
import {AuthenticationState} from '../states/AuthenticationState';
import {SERVICE_TYPES} from '../../../inversify.config';

export const authenticateWithBiometrics = createAsyncThunk<boolean>(
  'authentication/authenticateWithBiometrics',
  async (_, {rejectWithValue}) => {
    try {
      const biometricsService = container.get<BiometricsService>(
        SERVICE_TYPES.Biometrics,
      );

      const isBiometricsAvailable =
        await biometricsService.isBiometricsAvailable();

      if (!isBiometricsAvailable) {
        throw new Error('Biometrics not available');
      }

      const result = await biometricsService.authenticate();
      return result;
    } catch (error: any) {
      throw rejectWithValue(error.message);
    }
  },
);

const initialState: AuthenticationState = {
  loading: false,
  isAuthenticated: false,
  error: null,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    resetAuthenticationSlice: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(authenticateWithBiometrics.pending, state => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(authenticateWithBiometrics.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = action.payload;
      state.error = null;
    });
    builder.addCase(authenticateWithBiometrics.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload as Error;
    });
  },
});

export const {resetAuthenticationSlice} = authenticationSlice.actions;

export default authenticationSlice.reducer;
