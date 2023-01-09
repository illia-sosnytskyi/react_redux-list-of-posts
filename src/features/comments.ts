/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type State = {
  selectedPost: Post | null,
  comments: Comment[],
  loading: boolean,
  error: string,
};

const initialState: State = {
  selectedPost: null,
  comments: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    closeDetails: state => {
      state.selectedPost = null;
      state.comments = [];
    },
    openDetails: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export default commentSlice.reducer;
export const { actions } = commentSlice;
