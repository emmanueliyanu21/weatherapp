import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from '../modules/Home';

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};
global.navigator.geolocation = mockGeolocation;

const mockStore = configureStore();

describe('Home component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      weather: {
        cities: [],
        loading: false,
        searchResult: null,
        favorites: [],
        userLocation: null,
        topCities: [],
      },
    });
  });

  test('renders Home component with loading state', () => {
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
  });

  test('renders Home component with search result', async () => {
    const mockWeatherData = {
      city: 'MockCity',
      temperature: '20°C',
    };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockWeatherData),
    });

    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search city...');
    act(() => {
      searchInput.value = 'MockCity';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    });

    await waitFor(() => {
      const cityElement = screen.getByText('MockCity');
      expect(cityElement).toBeInTheDocument();
    });
  });


});
