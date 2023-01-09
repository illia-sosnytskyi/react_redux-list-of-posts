/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type State = {
  users: User[],
  loading: boolean,
  error: string,
};

const initialState: State = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export default usersSlice.reducer;
