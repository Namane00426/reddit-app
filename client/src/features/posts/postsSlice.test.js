// src/features/posts/postsSlice.test.js

import { configureStore } from '@reduxjs/toolkit';
import postsReducer, { setSubreddit, setSort, fetchPosts } from './postsSlice';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('fetchPosts thunk', () => {
  test('dispatches posts on successful fetch', async () => {

    const fakePost = {
      id: '1',
      title: 'Test Title',
      thumbnail: 'https://example.com/img.png',
      author: 'user1',
      ups: 100,
      permalink: '/r/test/1',
      num_comments: 10,
    };

    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          children: [{ data: fakePost }]
        }
      })
    );

    const store = configureStore({
      reducer: {
        posts: postsReducer
      }
    });

    await store.dispatch(fetchPosts({ subreddit: 'test', sort: 'hot' }));

    const state = store.getState().posts;

    expect(state.posts).toEqual([fakePost]);
    expect(state.error).toBe(null);
  }
  
),

test('setSubreddit updates state', () => {
  const initialState = {  
    posts: [],
  loading: false,
  error: null,
  subreddit: 'reactjs',
  sort: 'hot'};
  const nextState = postsReducer(initialState, setSubreddit('javascript'));
  expect(nextState.subreddit).toBe('javascript');
});

test('setSubreddit updates subreddit in state', ()=> {
  const initialState = {
    posts: [],
    loading: false,
    error: null,
    subreddit:'reactjs',
    sort: 'hot',
  }
  const newState = postsReducer(initialState, setSubreddit('javascript'));
  expect(newState.subreddit).toBe('javascript')
});

test('setSort updates sort in state', () => {
  const initialState= {
    posts: [],
    loading: false,
    error: null,
    subreddit: 'javascript',
    sort: 'hot',
  }
  const newState = postsReducer(initialState, setSort('new'));
  expect(newState.sort).toBe('new');
});

test('handles fetchPosts rejection with payload', async () => {
  const store = configureStore({
    reducer: {posts: postsReducer},
  });

  fetchMock.mockRejectOnce(() => Promise.reject('API failure'));

  await store.dispatch(fetchPosts({ subreddit: 'invalid', sort: 'hor'}));

  const state = store.getState().posts;
  expect(state.error).toBe('Failed to fetch posts.');
  expect(state.loading).toBe(false);
});

test('handles fetchpost with bad response (not ok)', async () => {
  const store = configureStore({
    reducer: {posts: postsReducer},
  });

  fetchMock.mockResponseOnce('', {status:404});
  await store.dispatch(fetchPosts({ subreddit: 'notfound', sort: 'hot'}));
  const state = store.getState().posts;
  expect(state.error).toBe('Failed to fetch posts.');
  expect(state.loading).toBe(false);

})

test('handles fetchPosts with empty posts array', async () => {
  const store = configureStore({
    reducer: {posts: postsReducer},
  });

  fetchMock.mockResponseOnce(
    JSON.stringify({
    data: {
       children: [], 
      }
   })
  );

  await store.dispatch(fetchPosts({ subreddit: 'empty', sort: 'hot'}))
  const state = store.getState().posts;
  
  expect(state.error).toBe('Failed to fetch posts.');
  expect(state.posts).toEqual([]);
  expect(state.loading).toBe(false);
})
});