import axios from 'axios';

const REACT_APP_OPENCAGE_API_KEY = 'bd86919867d342649705decc29a9b447';

export const reverseGeocode = async (latitude, longitude) => {
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${REACT_APP_OPENCAGE_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    const city = response.data.results[0]?.components?.city;
    return city || 'Unknown City';
  } catch (error) {
    console.error('Error in reverse geocoding:', error.message);
    return 'Unknown City';
  }
};
