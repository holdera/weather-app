import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import DayDetails from './DayDetails';
import DayItemButton from './DayItemButton';
import Hero from './Hero';
import Line from './Line';
import SunSetRise from './SunSetRise';
import WeatherDetails from './WeatherDetails';

import { calculateMean, formatDay, getCurrentDateTime } from '../utils/helpers';
import { h1Heading } from '../styles/ui';

export default function DayItems({ data, unit }) {
	const [reveal, setReveal] = useState(null);
	const [todayDate, seTodayDate] = useState(null);

	const detailsContainer = useRef();
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	function buttonHandler(index) {
		setReveal((prevState) => (prevState === index ? null : index));
	}

	useEffect(() => {
		const currentDate = new Date();
		const today = formatDay(currentDate);

		const todayWeather = data.list.filter(
			(day) => formatDay(day.dt_txt) === today
		);
		if (todayWeather.length) {
			seTodayDate({
				days: todayWeather,
				temps: todayWeather.map((day) => day.main.temp),
				humidities: todayWeather.map((day) => day.main.humidities),
			});
		}
	}, [data]);

	const groupedData = data.list.reduce((acc, day) => {
		const date = formatDay(day.dt_txt);
		const currentDate = new Date();
		const today = formatDay(currentDate);
		if (!date.includes(today)) {
			if (!acc[date]) {
				acc[date] = {
					days: [],
					temps: [],
					pressures: [],
					humidities: [],
					weather: [],
				};
			}
			acc[date].days.push(day);
			acc[date].temps.push(day.main.temp);
			acc[date].humidities.push(day.main.humidity);
			acc[date].weather.push(day.weather);
		}
		return acc;
	}, {});

	const MouseDownHandler = (e) => {
		setIsDragging(true);
		setStartX(e.pageX - detailsContainer.current.offsetLeft);
		setScrollLeft(detailsContainer.current.scrollLeft);
	};

	const MouseLeaveHandler = () => {
		setIsDragging(false);
	};

	const MouseUpHandler = () => {
		setIsDragging(false);
	};

	const MouseMoveHandler = (e) => {
		if (!isDragging) return;
		e.preventDefault();
		const x = e.pageX - detailsContainer.current.offsetLeft;
		const moving = (x - startX) * 3;
		detailsContainer.current.scrollLeft = scrollLeft - moving;
	};

	return (
		<>
			<Hero>
				<div className='flex flex-col md:flex-row md:justify-between md:items-center'>
					<div>
						<h1 className={h1Heading}>
							Current location:
							<br /> {data.city.name}, {data.city.country}
						</h1>
						<p className='font-semibold'>
							{getCurrentDateTime().today} /{' '}
							{getCurrentDateTime().time}
						</p>
						<SunSetRise
							sunrise={data.city.sunrise}
							sunset={data.city.sunset}
						/>
					</div>
					<div>
						{todayDate && (
							<div className='p-4 text-center'>
								<h2 className='mb-4'>Average Temperature</h2>

								<p className={h1Heading}>
									{calculateMean(todayDate.temps)} &#8451;
								</p>
							</div>
						)}
					</div>
				</div>
			</Hero>

			<section id='today-weather'>
				{todayDate && (
					<div className='bg-blue-800/15 border border-blue-800/50 mb-5 py-3 px-3.5 rounded-md text-center w-full md:p-6'>
						<h2 className='date font-bold text-xl mb-4 md:mb-6 md:text-2xl'>
							Today&apos;s Weather
						</h2>
						<div
							className='flex justify-around flex-wrap overflow-x-auto gap-3'
							tabIndex={0}
						>
							{todayDate.days.map((day) => (
								<div
									key={`${day.dt}-today-data`}
									className='w-1/3 min-w-[48%] md:min-w-[32%]'
								>
									<DayDetails
										aria-hidden={
											reveal === null ? true : false
										}
										day={day}
									/>
									<WeatherDetails day={day} />
								</div>
							))}
						</div>
					</div>
				)}
			</section>

			<section className=' w-full'>
				<h2 className='font-bold text-xl mt-6 mb-5 md:text-2xl'>
					Weather of the Week
				</h2>

				{Object.keys(groupedData).map((date, index) => {
					const meanTemp = calculateMean(groupedData[date].temps);
					const meanHumidity = calculateMean(
						groupedData[date].humidities
					);
					const desc = groupedData[date].weather[0]
						.map((d) => d.main)
						.toString();
					const img = groupedData[date].weather[0]
						.map((d) => d.icon)
						.toString();

					return (
						<>
							<div
								key={`${date}-${index}`}
								className='mb-5 w-full'
							>
								<DayItemButton
									btnClick={() => buttonHandler(index)}
								>
									<div className='w-1/2 text-left'>
										<p className='date font-semibold'>
											{date}
										</p>

										<Image
											src={`https://openweathermap.org/img/w/${img}.png`}
											alt=''
											height={50}
											width={50}
										/>
										<p>{desc}</p>
										<p className='font-bold mt-2'>
											{Math.round(meanTemp)} &#8451;
										</p>

										<p>
											Humidity <Line />{' '}
											{Math.floor(meanHumidity)}%
										</p>
									</div>
									<Image
										src='/images/arrow-icon.svg'
										alt='click to toggle'
										width={30}
										height={30}
										className={`absolute transition-all right-5 top-0 bottom-0 my-auto md:right-10 ${
											reveal === index
												? 'rotate-180'
												: 'transform-none'
										}`}
									/>
								</DayItemButton>
							</div>
							{reveal === index && (
								<div
									className='flex justify-around mt-4 text-center py-5 overflow-x-auto mb-5 md:mb-5'
									tabIndex={0}
									ref={detailsContainer}
									onMouseDown={MouseDownHandler}
									onMouseLeave={MouseLeaveHandler}
									onMouseUp={MouseUpHandler}
									onMouseMove={MouseMoveHandler}
								>
									{groupedData[date].days.map((day) => (
										<div
											key={`${day.dt}-group-data`}
											className='w-1/3 min-w-[48%] bg-blue-800/15 border border-blue-800/50 py-5 rounded-md mr-[4%] md:mr-[2%] md:min-w-[32%]'
										>
											<DayDetails
												aria-hidden={
													reveal === null
														? true
														: false
												}
												day={day}
											/>
											<WeatherDetails day={day} />
										</div>
									))}
								</div>
							)}
						</>
					);
				})}
			</section>
		</>
	);
}
