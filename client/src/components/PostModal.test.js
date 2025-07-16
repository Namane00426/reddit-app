import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostModal from './PostModal';
import defaultThumbnail from './assets/default-thumbnail.s.png';

const mockPost = {
  id: 'abc123',
  title: 'Example Post Title',
  author: 'test_user',
  ups: 123,
  thumbnail: 'https://example.com/image.jpg',
  permalink: '/r/test/abc123',
  num_comments: 45,
  selftext: 'This is a test post content.',
};

const renderModal = (post, onClose = () => {}) => {
  return render(<PostModal post={post} onClose={onClose} />);
};

describe('PostModal', () => {
  test('renders nothing when post is null', () => {
    const { container } = renderModal(null);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders post details correctly', () => {
    renderModal(mockPost);
    expect(screen.getByText('Example Post Title')).toBeInTheDocument();
    expect(screen.getByText(/test_user/)).toBeInTheDocument();
    expect(screen.getByText(/123 upvotes/)).toBeInTheDocument();
    expect(screen.getByText(/45 comments/)).toBeInTheDocument();
    expect(screen.getByText('This is a test post content.')).toBeInTheDocument();
  });

  test('renders valid thumbnail image', () => {
    renderModal(mockPost);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockPost.thumbnail);
  });

  test('renders default thumbnail when thumbnail is invalid', () => {
    const invalidThumbnailPost = { ...mockPost, thumbnail: 'self' };
    renderModal(invalidThumbnailPost);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', defaultThumbnail);
  });

  test('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn();
    renderModal(mockPost, onClose);
    fireEvent.click(screen.getByText('✖').parentElement.parentElement); // modal backdrop div
    expect(onClose).toHaveBeenCalled();
  });

  test('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    renderModal(mockPost, onClose);
    fireEvent.click(screen.getByText('✖'));
    expect(onClose).toHaveBeenCalled();
  });

  test('does not call onClose when modal content is clicked', () => {
    const onClose = jest.fn();
    renderModal(mockPost, onClose);
    fireEvent.click(screen.getByText('Example Post Title')); // modal content click
    expect(onClose).not.toHaveBeenCalled();
  });
});
