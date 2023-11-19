import { useState } from 'react';
import './style.css'

const Search = ({ onSearch}) => {
    const [cityName, setCityName] = useState('');

    const handleInputChange = (event) => {
        setCityName(event.target.value);
    };

    const handleSearch = () => {
        if (cityName.trim() !== '') {
            onSearch(cityName);
            setCityName('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='search-wrapper'>
            <input
                type="text"
                placeholder="Enter city name"
                value={cityName}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <div className='search-icon' onClick={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="black" fillRule="evenodd" d="M11 2a9 9 0 1 0 5.618 16.032l3.675 3.675a1 1 0 0 0 1.414-1.414l-3.675-3.675A9 9 0 0 0 11 2Zm-6 9a6 6 0 1 1 12 0a6 6 0 0 1-12 0Z" clipRule="evenodd" /></svg></div>

        </div>
    );
};

export default Search;
