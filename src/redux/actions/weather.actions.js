import * as types from '../types/weather.types';

export const setCities = (payload) => ({
  type: types.SET_CITIES,
  payload,
});

export const setSearchResult = (payload) => ({
  type: types.SET_SEARCH_RESULT,
  payload,
});

export const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

export const setFavorites = (payload) => ({
  type: types.SET_FAVORITES,
  payload,
});

export const setUserLocation = (payload) => ({
  type: types.SET_USER_LOCATION,
  payload,
});

export const setTopCities = (payload) => ({
  type: types.SET_TOP_CITIES,
  payload,
});

