// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {SetStorage,Logout, GetStorage} from '../../service/authservice'
import {StorageI} from '../../service/interface'



interface AuthState {
  isAuthenticated: boolean;
  user: StorageI | null;
  resetToken: string | null;
}

const storedCredentials = GetStorage();

const initialState: AuthState = {
  isAuthenticated: !!storedCredentials,
  user: storedCredentials,
  resetToken: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: StorageI; remember: boolean }>
    ) => {







      
      state.isAuthenticated = true;
      state.user = action.payload.user;
      SetStorage(action.payload.user, action.payload.remember);
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      Logout();
    },

    setResetToken: (
      state,
      action: PayloadAction<{ token: string }>
    ) => {
      state.resetToken = action.payload.token;
    },

    clearResetToken: (state) => {
      state.resetToken = null;
    }
  },
});

export const { login, logout, setResetToken, clearResetToken } = authSlice.actions;
export default authSlice.reducer;
