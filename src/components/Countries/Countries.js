import { useEffect, useState } from "react";
import './style.css';

import data from './static-data'

function Mycountry({ sendDataToParent }) {
    const [query, setQuery] = useState({ region: "default" });
    // eslint-disable-next-line
    const [filteredData, setFilteredData] = useState(data["default"]);
    const [isOpen, setIsOpen] = useState(true);

    const handleSelect = (e) => {
        const region = e.target.value.toLowerCase();
        setQuery({ region });
        const regionData = data[region] || data["default"];
        setFilteredData(regionData);
        sendDataToParent(regionData);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        sendDataToParent(data["default"]);
    }, [sendDataToParent]);

    const dropdownIcon = isOpen ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 12 12"><path fill="currentColor" d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1c.3-.3.8-.3 1.1 0l2.7 2.7l2.7-2.7c.3-.3.8-.3 1.1 0c.3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z" /></svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 12 12"><path fill="currentColor" d="M6 4c-.2 0-.4.1-.5.2L2.2 7.5c-.3.3-.3.8 0 1.1c.3.3.8.3 1.1 0L6 5.9l2.7 2.7c.3.3.8.3 1.1 0c.3-.3.3-.8 0-1.1L6.6 4.3C6.4 4.1 6.2 4 6 4Z" /></svg>
    );

    return (
        <div className="wrapper">
            <div onClick={toggleDropdown} className={`custom-dropdown `} >
                <select
                    onChange={handleSelect}
                    value={query.region}
                    className="custom-select"
                    aria-label="Filter Countries By Region"
                >
                    <option value="default">Filter By Region</option>
                    <option value="africa">Africa</option>
                    <option value="americas">America</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                </select>
                <div className="selected-value" >
                    {dropdownIcon}
                </div>
            </div>
        </div>
    );
}

export default Mycountry;
