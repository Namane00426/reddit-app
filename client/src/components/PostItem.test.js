import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import PostItem from './PostItem';
import { BrowserRouter } from 'react-router-dom';

// mock navigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({pathname: '/'}),
}));

const mockPost = {
  id: '123',
  title: 'Test Reddit Post',
  author: 'test_user',
  ups: 100,
  thumbnail: 'https://example.com/image.jpg',
  permalink: '/r/test/123',
};

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('PostItem', () => {
  test('renders post title and author', () => {
    renderWithRouter(<PostItem post={mockPost} />);
    expect(screen.getByText('Test Reddit Post')).toBeInTheDocument();
    expect(screen.getByText(/by test_user/)).toBeInTheDocument();
  });

  test('renders thumbnail when valid', () => {
    renderWithRouter(<PostItem post={mockPost}/>);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockPost.thumbnail);
  });

  test('navigates on click', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
    
    renderWithRouter(<PostItem post={mockPost} />);
    fireEvent.click(screen.getByRole('listitem')); //click list tag
    expect(mockNavigate).toHaveBeenCalledWith(`/post/${mockPost.id}`, expect.anything());

  });
})