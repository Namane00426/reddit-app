import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import {Provider} from 'react-redux';
import store from './app/store';
import { MemoryRouter } from 'react-router-dom';


test('renders learn react link', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
    </Provider>
);

await waitFor(() => {
  expect(screen.getByText(/Reddit/i)).toBeInTheDocument();
});

});
