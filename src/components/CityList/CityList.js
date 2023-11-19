import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const CityList = ({ cities, favorites, handleToggle, isFavoriteList, isSearchList, handleBack }) => {
    const cityData = isFavoriteList ? favorites : (cities.sort((a, b) => a.city.localeCompare(b.city)));
    return (
        <>
            {isSearchList ? (
                <div onClick={handleBack} className='arrow-back'>
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
                </div>
            ) : null}
            <h2>{isFavoriteList ? 'Favorite Cities' : 'Weather Location'}</h2>
            <div className={isFavoriteList ? 'city-favourite' : 'city-wrapper'}>
                {cityData && cityData?.length > 0 ? (
                    cityData.map((data, index) => {
                        return (
                            <div className='city-card' key={index}>
                                <div className='city-card-wrapper'>
                                    <div>
                                        <div>{data.city}</div>
                                        <div className='temperature'>{data?.temperature}°C</div>
                                    </div>
                                    <div>
                                        <span onClick={() => handleToggle(data)} className="favorite-icon">
                                            {favorites.some(fav => fav.city === data.city) ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="#f1540b" d="m7.325 19.923l1.24-5.313l-4.123-3.572l5.431-.47L12 5.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 17.102l-4.675 2.821Z" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575Zm-1.525 2.098l1.24-5.313l-4.123-3.572l5.431-.47L12 5.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 17.102l-4.675 2.821ZM12 13.25Z" />
                                                </svg>
                                            )}
                                        </span>
                                    </div>
                                    <div className="button" >
                                        <Link to={`/${data.city}`}>
                                            <span>view details</span>
                                            <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                                                <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                                                <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="empty-note">
                        {isFavoriteList
                            ? "You haven't added any favorite cities. Add your favorite cities to see them here."
                            : "No cities available. Add your favorite cities to see them here."
                        }
                    </div>
                )}
            </div>
        </>
    );
};

export default CityList;
