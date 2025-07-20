import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchPostsFromApi} from '../../api'

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async({subreddit, sort}, thunkAPI) => {
    try{
       const posts = await fetchPostsFromApi(subreddit, sort);
       return posts;
       
  } catch(error){
     return thunkAPI.rejectWithValue(error.message || 'Failed to fetch posts.');
  }
}
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
    subreddit: 'javascript',
    sort: 'hot'
  },
  reducers: {
    setSubreddit(state, action){
      state.subreddit = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    }
  },
 extraReducers: (builder) => {
  builder
    .addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message || "Failed to fetch posts.";
    });
}
})

export const {setSubreddit, setSort} = postsSlice.actions;
export default postsSlice.reducer;