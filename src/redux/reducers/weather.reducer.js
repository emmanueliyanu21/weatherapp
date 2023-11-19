import * as types from '../types/weather.types';

const initialState = {
  cities: [],
  loading: false,
  searchedCity: null,
  searchResult: null,
  favorites: [],
  userLocation: null,
  topCities: [],
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CITIES:
      return { ...state, cities: action.payload };

    case types.SET_SEARCH_RESULT:
      return { ...state, searchResult: action.payload };

    case types.SET_LOADING:
      return { ...state, loading: action.payload };

    case types.SET_FAVORITES:
      return { ...state, favorites: action.payload };

    case types.SET_USER_LOCATION:
      return { ...state, userLocation: action.payload };

    case types.SET_TOP_CITIES:
      return { ...state, topCities: action.payload };

    default:
      return state;
  }
};

export default weatherReducer;
