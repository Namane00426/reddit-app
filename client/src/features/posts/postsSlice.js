import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async({subreddit, sort}, thunkAPI) => {
    try{
       const response = await fetch(`http://localhost:4000/api/posts/${subreddit}?sort=${sort}`);
       
       if(!response.ok){
        throw new Error (`Subreddit "${subreddit}" not found`);
       }
     const data = await response.json();
     if(!data?.data?.children || data.data.children.length === 0){
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