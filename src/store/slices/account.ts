import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as jwt from 'jwt';
import { AppThunk } from 'store';
import { Guid, Token } from 'types/common';
import { IUser } from 'types/user';
import { IUserLoginRequest } from 'api/types/users';
import { logUserIn } from 'api/users';

interface IState extends IUser {
  isDemo: boolean;
}

type JwtMapping = {
  [key: string]: keyof IState;
};

const initialState: IState = {
  id: '' as Guid,
  email: '',
  name: '',
  isDemo: true,
};

const mapping: JwtMapping = {
  user_id: 'id',
  email: 'email',
  name: 'name',
  demo: 'isDemo',
};

export const parseUserToken = (token: Token) => {
  const [, base64Url] = token.split('.');
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    Buffer.from(base64, 'base64')
      .toString()
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  const mappedUserData = JSON.parse(jsonPayload, (key, value) => {
    return key in mapping ? value : undefined;
  });

  return mappedUserData as IState;
};

export const signIn = createAsyncThunk(
  'account/signIn',
  async (credentials: IUserLoginRequest) => {
    try {
      const loginRequest = await logUserIn(credentials);
      const token = loginRequest.data;

      jwt.set(token);

      return parseUserToken(token);
    } catch (error) {
      // TODO: Replace with a proper error handling
      console.log(error);
    }
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<IState>) => {
      state = action.payload;
    },
    clear: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, { payload: userData }) => {
      if (userData) {
        state = userData;
      }
    });
  },
});

export const { update, clear } = accountSlice.actions;

export default accountSlice.reducer;

export const updateFromNewToken =
  (token: Token): AppThunk =>
    (dispatch) => {
      jwt.set(token);

      const accountData = parseUserToken(token);
      dispatch(update(accountData));
    };

export const signOut = (): AppThunk => (dispatch) => {
  jwt.remove();

  dispatch(clear());
};
