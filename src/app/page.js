'use client';
import { useEffect, useState, useRef } from 'react';
import { KEY } from './components/data/endpoint';
import Container from './components/structure/Container';

import DayItems from './components/DayItems';
import Hero from './components/Hero';
import SearchTool from './components/SearchTool';
import Loader from './components/Loader';
import { h1Heading } from './styles/ui';

export default function Home() {
	const [isFetching, setIsFetching] = useState(false);
	const [coords, setCoords] = useState({});
	const [data, setData] = useState(null);
	const [unit, setUnit] = useState('metric');
	const searchInput = useRef();

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;
				setCoords({ lat, lon });
			});
		} else {
			throw new Error('Geolocation is not supported by your browser');
		}
	}, []);

	useEffect(() => {
		if (coords.lat && coords.lon) {
			async function getWeatherData() {
				setIsFetching(true);
				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/forecast?lat=${
						coords.lat && coords.lat
					}&lon=${coords.lon}&appid=${KEY}&units=${unit}`
				);

				const resData = await response.json();

				if (!response.ok) {
					throw new Error('Failed to get weather information');
				}
				setIsFetching(false);
				setData(resData);
			}
			getWeatherData();
		}
	}, [coords]);

	function searchHandler() {
		const value = searchInput.current.value;

		async function fetchNewData() {
			setIsFetching(true);
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${KEY}&units=${unit}`
			);
			if (!response.ok) {
				setData(null);
				setIsFetching(false);
				throw new Error('Search value is not valid. Please try again.');
			}
			setIsFetching(false);
			const searchResData = await response.json();
			setData(searchResData);
		}
		value !== '' && fetchNewData();
		searchInput.current.value = '';
	}

	let metricUnit = unit === 'imperial' ? <>&#8457;</> : <>&#8451;</>;
	return (
		<section>
			<Container>
				<SearchTool ref={searchInput} searchHandler={searchHandler} />
				{isFetching && <Loader />}

				{!isFetching && data && (
					<>
						<DayItems data={data} unit={metricUnit} />
					</>
				)}
				{!isFetching && !data && (
					<Hero>
						<h1 className={h1Heading}>
							Upcoming Weather Forecast is Unavailable
						</h1>
						<p>Please try again later.</p>
					</Hero>
				)}
			</Container>
		</section>
	);
}
