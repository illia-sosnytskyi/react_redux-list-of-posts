/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../types/User';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type State = {
  selectedUser: User | null,
  posts: Post[],
  loading: boolean,
  error: string,
};

const initialState: State = {
  selectedUser: null,
  posts: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
