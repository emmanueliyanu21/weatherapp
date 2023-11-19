import { render, waitFor } from '@testing-library/react';
import CityDetails from '../components/CityDetails/CityDetails';

const mockCityDetails = {
    main: {
        temp: 25,
        feels_like: 28,
        temp_min: 23,
        temp_max: 27,
        pressure: 12,
        humidity: 34,
    },
    sys: {
        sunrise: 23,
        sunset: 24,
    },
    weather: [{ description: 'Clear' }],
    wind: { speed: 5, deg: 180, gust: 8 },
    clouds: { all: 30 },
};

test('renders CityDetails component', () => {
    render(<CityDetails />);
});

test('displays loader while loading data', () => {
    const { getByTestId } = render(<CityDetails />);
    const loaderElement = getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
});

test('fetches and displays city details', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCityDetails),
    });

    const { getByText } = render(<CityDetails />);

    await waitFor(() => {
        expect(getByText('Temperature:')).toBeInTheDocument();
    });
});

test('displays error message on failed data fetch', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
    });

    const { getByText } = render(<CityDetails />);

    await waitFor(() => {
        expect(getByText('Temperature:')).toBeInTheDocument();
        expect(getByText(`Temperature: ${mockCityDetails.main.temp}°C`)).toBeInTheDocument();
        expect(getByText(`Feels Like: ${mockCityDetails.main.feels_like}°C`)).toBeInTheDocument();
    });
});
