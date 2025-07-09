import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async(subreddit, thunkAPI) => {
    try{
       const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
       
       if(!response.ok){
        throw new Error (`Subreddit "${subreddit} not found`);
       }
     const data = await response.json();
     if(!data?.data?.children || data.data.children === 0){
      throw new Error(`No posts found for subreddit "${subreddit}"`);
     }
    return data.data.children.map(child => child.data);
  } catch(error){
    return thunkAPI.rejectWithValue(error.message);
  }
}
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
    subreddit: 'reactjs'
  },
  reducers: {
    setSubreddit(state, action){
      state.subreddit = action.payload;
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
      state.error = action.payload || action.error.message;
    });
}
})

export const {setSubreddit} = postsSlice.actions;
export default postsSlice.reducer;