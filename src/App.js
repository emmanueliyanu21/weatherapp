import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './modules/Home/Home.js'; 
import CityList from './components/CityList/CityList.js';
import CityDetails from './components/CityDetails/CityDetails.js'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city-list" element={<CityList />} />
        <Route path="/:cityName" element={<CityDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
