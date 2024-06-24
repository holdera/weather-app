import { useState, useEffect } from 'react';
import DayDetails from './DayDetails';
import WeatherDetails from './WeatherDetails';
import Hero from './Hero';
import SunSetRise from './SunSetRise';

import { calculateMean, formatDay, getCurrentDateTime } from '../utils/helpers';
import { h1Heading } from '../styles/ui';

export default function DayItems({ data, unit }) {
	const [reveal, setReveal] = useState(null);
	const [todayDate, seTodayDate] = useState(null);

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
				};
			}
			acc[date].days.push(day);
			acc[date].temps.push(day.main.temp);
			acc[date].humidities.push(day.main.humidity);
		}
		return acc;
	}, {});

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
									{calculateMean(todayDate.temps)} {unit}
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
							className='flex justify-around flex-wrap overflow-x-auto'
							tabIndex={0}
						>
							{todayDate.days.map((day) => (
								<div
									key={`${day.dt}-today-data`}
									className='w-1/3 min-w-[48%] mr-[4%] md:mr-[2%] md:min-w-[32%]'
								>
									<DayDetails
										aria-hidden={
											reveal === null ? true : false
										}
										day={day}
									/>
									<WeatherDetails day={day} unit={unit} />
								</div>
							))}
						</div>
					</div>
				)}
			</section>

			<section className='flex flex-col w-full'>
				<h2 className='font-bold text-xl mt-6 mb-5 md:text-2xl'>
					Weather of the Week
				</h2>

				{Object.keys(groupedData).map((date, index) => {
					const meanTemp = calculateMean(groupedData[date].temps);
					const meanHumidity = calculateMean(
						groupedData[date].humidities
					);

					return (
						<div key={`${date}-${index}`} className='mb-5 w-full'>
							<button
								className='bg-blue-800/15 border border-blue-800/50 rounded-md w-full cursor-pointer p-3'
								onClick={() => buttonHandler(index)}
							>
								<p className='date font-semibold'>{date}</p>
								<h3 className='bold text-lg'>
									Average Temperature
								</h3>
								<p className='font-bold'>
									{Math.round(meanTemp)} {unit}
								</p>
								<p>Humidity | {Math.floor(meanHumidity)}%</p>
							</button>
							{reveal === index && (
								<div
									className='flex justify-around mt-4 text-center pb-5 overflow-x-auto'
									tabIndex={0}
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
						</div>
					);
				})}
			</section>
		</>
	);
}
