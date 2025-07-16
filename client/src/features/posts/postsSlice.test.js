// src/features/posts/postsSlice.test.js

import { configureStore } from '@reduxjs/toolkit';
import postsReducer, { fetchPosts } from './postsSlice';
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
  })})