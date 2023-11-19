import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Note from './Note';
import CityDetailsBackground from './CityDetailsBackground/CityDetailsBackground';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import config from '../../config/index';

const CityDetails = () => {
    const { cityName } = useParams();
    const [cityDetails, setCityDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const apiUrl = `${config.apiUrl}?q=${cityName}&appid=${config.apiKey}&units=${config.units}`;
    useEffect(() => {
        const fetchCityDetails = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch city details');
                }
                const data = await response.json();
                setCityDetails(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCityDetails();
    }, [cityName, apiUrl]);

    return (
        <div className='card-wrapper'>
            <div className='details-arrow-back'>
                <Link to='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                        <defs>
                            <mask id="ipTBack0">
                                <path
                                    fill="#555"
                                    fillRule="evenodd"
                                    stroke="#fff"
                                    strokeLinejoin="round"
                                    strokeWidth="4"
                                    d="M44 40.836c-4.893-5.973-9.238-9.362-13.036-10.168c-3.797-.805-7.412-.927-10.846-.365V41L4 23.545L20.118 7v10.167c6.349.05 11.746 2.328 16.192 6.833c4.445 4.505 7.009 10.117 7.69 16.836Z"
                                    clipRule="evenodd"
                                />
                            </mask>
                        </defs>
                        <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTBack0)" />
                    </svg>
                </Link>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className='card-holder'>

                    <div className='card-details'>
                        <h2>{cityName} Details</h2>
                        <ul>
                            <li><span >Temperature:</span> {cityDetails?.main?.temp}°C</li>
                            <li><span >Feels Like:</span> {cityDetails?.main?.feels_like}°C</li>
                            <li><span >Min Temperature:</span> {cityDetails?.main?.temp_min}°C</li>
                            <li><span >Max Temperature:</span> {cityDetails?.main?.temp_max}°C</li>
                            <li><span >Weather:</span> {cityDetails?.weather[0]?.description}</li>
                            <li><span >Wind Speed:</span> {cityDetails?.wind?.speed} m/s</li>
                            <li><span >Wind Direction:</span> {cityDetails?.wind?.deg}°</li>
                            <li><span >Wind Gust:</span> {cityDetails?.wind?.gust} m/s</li>
                            <li><span >Cloudiness:</span> {cityDetails?.clouds?.all}%</li>
                            <li><span >Timestamp:</span> {cityDetails?.dt}</li>
                            <li><span >Sunrise:</span> {cityDetails?.sys?.sunrise}</li>
                            <li><span >Sunset:</span> {cityDetails?.sys?.sunset}</li>
                            <li><span >Pressure:</span> {cityDetails?.main?.pressure} hPa</li>
                            <li><span >Humidity:</span> {cityDetails?.main?.humidity}%</li>
                            <li><span >Visibility:</span> {cityDetails?.visibility} meters</li>
                        </ul>
                    </div>
                    <Note />
                    <CityDetailsBackground />
                </div>
            )}

        </div>
    );
};

export default CityDetails;
