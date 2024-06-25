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
	const [coords, setCoords] = useState(null);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isFetching, setIsFetching] = useState(true);

	const searchInput = useRef();

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;
				setCoords({ lat, lon });
			});
		} else {
			setError('Geolocation is not supported by your browser');
			setIsFetching(false);
		}
	}, []);

	useEffect(() => {
		if (coords) {
			async function getWeatherData() {
				// setIsFetching(true);
				setError(null);

				try {
					const response = await fetch(
						`https://api.openweathermap.org/data/2.5/forecast?lat=${
							coords.lat && coords.lat
						}&lon=${coords.lon}&appid=${KEY}&units=metric`
					);

					if (!response.ok) {
						throw new Error('Failed to get weather information');
					}

					const resData = await response.json();
					setData(resData);
				} catch (error) {
					setError(error.message);
				} finally {
					setIsFetching(false);
				}
			}
			getWeatherData();
		}
	}, [coords]);

	function searchHandler() {
		const value = searchInput.current.value;

		if (value) {
			async function fetchNewData() {
				setIsFetching(true);
				setError(null);

				try {
					const response = await fetch(
						`https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${KEY}&units=metric`
					);

					if (!response.ok) {
						throw new Error(
							'Search value is not valid. Please try again.'
						);
					}

					const searchResData = await response.json();
					setData(searchResData);
				} catch (error) {
					setError(error.message);
					setData(null);
				} finally {
					setIsFetching(false);
				}
			}
			fetchNewData();
		}
		searchInput.current.value = '';
	}

	return (
		<section>
			<Container>
				<SearchTool ref={searchInput} searchHandler={searchHandler} />

				{isFetching && <Loader />}

				{error && !isFetching && (
					<Hero id='hero-error'>
						<h1 className={h1Heading}>Error</h1>
						<p>{error}</p>
					</Hero>
				)}

				{!isFetching && data && !error && (
					<>
						<DayItems data={data} />
					</>
				)}

				{!isFetching && !data && !error && (
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
