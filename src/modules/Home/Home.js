import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCities, setSearchResult, setLoading, setFavorites, setUserLocation, setTopCities } from '../../redux/actions/weather.actions';
import CityList from '../../components/CityList/CityList';
import Search from '../../components/Search/Search';
import axios from 'axios';
import { reverseGeocode } from '../../utils/geocoding';
import { useNavigate } from 'react-router-dom';
import Mycountry from '../../components/Countries/Countries';
import debounce from 'lodash/debounce';
import Loader from '../../components/Loader/Loader';
import config from '../../config/index';

function Home() {
    const dispatch = useDispatch();
    const weatherState = useSelector((state) => state.weather);
    const { cities, loading, searchResult, favorites, userLocation, topCities } = weatherState;
    const navigate = useNavigate();
    // eslint-disable-next-line
    const [searchedCity, setSearchedCity] = useState(null);
    const navigateToDetails = useCallback((userLocation) => {
        if (userLocation !== null) {
            navigate(`/${userLocation}`)
        }
    }, [navigate]);

    const handleToggleFavorite = useCallback((city) => {
        if (!Array.isArray(favorites)) {
            console.error('Favorites is not an array:', favorites);
            return;
        }

        const isCityInFavorites = favorites.some((favCity) => favCity.city === city.city);

        if (isCityInFavorites) {
            const updatedFavorites = favorites.filter((favCity) => favCity.city !== city.city);
            dispatch(setFavorites(updatedFavorites));
        } else {
            const updatedFavorites = [...favorites, city].sort((a, b) => a.city.localeCompare(b.city));
            dispatch(setFavorites(updatedFavorites));
        }
    }, [dispatch, favorites]);


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceHandleSearch = useCallback(
        debounce((cityName) => {
            dispatch(setSearchResult(''));
            dispatch(async (dispatch) => {
                try {
                    dispatch(setLoading(true));
                    const result = await getWeather(cityName);
                    dispatch(setSearchResult(result));
                } finally {
                    dispatch(setLoading(false));
                }
            });
        }, 500),
        [dispatch]
    );

    const handleSearch = (cityName) => {
        debounceHandleSearch(cityName);
    };

    const handleBackClick = () => {
        dispatch(setSearchResult(null));
    };

    const getUserLocation = useCallback(async () => {
        if (navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                const { latitude, longitude } = position.coords;
                const cityName = await reverseGeocode(latitude, longitude);
                dispatch(setUserLocation(cityName));
                if (cityName) {
                    navigate(`/${cityName}`);
                }
            } catch (error) {
                console.error(error.message);
            }
        } else {
        }
    }, [dispatch, navigate]);

    const handleChildData = useCallback((data) => {
        dispatch(setTopCities(data));
    }, [dispatch]);

    useEffect(() => {
        getUserLocation();
    }, [getUserLocation]);

    const getWeather = useCallback(async (city) => {
        try {
            setLoading(true);
            const apiUrl = `${config.apiUrl}?q=${city}&appid=${config.apiKey}&units=${config.units}`;
            const response = await axios.get(apiUrl);
            const temperature = response.data.main.temp;
            return { city, temperature };
        } catch (error) {
            console.error('Error fetching weather data:', error);
            if (error.response && error.response.status === 404) {
                return { city, temperature: 'City not found' };
            } else {
                return { city, temperature: 'N/A' };
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchWeatherForCities = useCallback(async (cities) => {
        const promises = cities.map(city => getWeather(city));
        return await Promise.all(promises);
    }, [getWeather]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                if (navigator.onLine) {
                    const results = await fetchWeatherForCities(topCities);
                    dispatch(setCities(results.sort((a, b) => a.city.localeCompare(b.city))));

                    localStorage.setItem('cachedCities', JSON.stringify(results));
                } else {
                    const cachedCities = localStorage.getItem('cachedCities');
                    if (cachedCities) {
                        dispatch(setCities(JSON.parse(cachedCities)));
                    }
                }

            } finally {
                dispatch(setLoading(false));
            }
        };

        if (userLocation || topCities.length > 0) {
            fetchData();
        }
        if (topCities.length > 0) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, topCities, fetchWeatherForCities, navigateToDetails]);

    return (
        <div className='weather-wrapper'>
            <div>
                <div className='content-header'>
                    <Search onSearch={handleSearch} />
                    <Mycountry sendDataToParent={handleChildData} />
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <div >
                        {searchResult ? (
                            <div className='city-list-wrapper'>
                                <CityList cities={[searchResult]} isSearchList={searchResult} handleBack={handleBackClick} favorites={favorites} handleToggle={handleToggleFavorite} />
                            </div>
                        ) : (
                            <div className='city-list-wrapper'>
                                <CityList cities={favorites} favorites={favorites} handleToggle={handleToggleFavorite} isFavoriteList={true} />
                                <CityList cities={cities} favorites={favorites} handleToggle={handleToggleFavorite} isFavoriteList={false} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;