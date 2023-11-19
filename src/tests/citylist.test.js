import React from 'react';
import { render, screen } from '@testing-library/react';
import CityList from '../components/CityList/CityList';

const cities = [
  { city: 'City1', temperature: '25°C' },
  { city: 'City2', temperature: '20°C' },
];

test('renders CityList component with a list of cities', () => {
  render(<CityList cities={cities} favorites={[]} handleToggle={() => {}} isFavoriteList={false} />);
  
  // Check if the component renders the city names and temperatures
  cities.forEach(city => {
    expect(screen.getByText(city.city)).toBeInTheDocument();
    expect(screen.getByText(`${city.temperature}`)).toBeInTheDocument();
  });
});

test('renders CityList component with correct "Favorite" icon', () => {
    const favorites = [{ city: 'City1', temperature: '25°C' }];
  
    render(<CityList cities={cities} favorites={favorites} handleToggle={() => {}} isFavoriteList={false} />);
    
    // Check if the "Favorite" icon is displayed for the favorite city
    expect(screen.getByText('City1').previousElementSibling).toHaveClass('favorite-icon');
  });

  import { BrowserRouter as Router } from 'react-router-dom';

test('renders CityList component with working "View Details" link', () => {
  render(
    <Router>
      <CityList cities={cities} favorites={[]} handleToggle={() => {}} isFavoriteList={false} />
    </Router>
  );

  // Check if the "View Details" link navigates to the correct URL
  cities.forEach(city => {
    const viewDetailsLink = screen.getByText('View Details').closest('a');
    expect(viewDetailsLink).toHaveAttribute('href', `/${city.city}`);
  });
});
