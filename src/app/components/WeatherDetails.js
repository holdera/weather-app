import { getWindSpeed } from '../utils/helpers';

export default function WeatherDetails({ day, unit }) {
	return (
		<div className='temp'>
			<p className='font-semibold'>
				{Math.round(day.main.temp)}
				{unit}
			</p>
			<p>
				Feels like {Math.round(day.main.feels_like)}
				{unit}
			</p>
			<p>
				High of {Math.round(day.main.temp_max)}
				{unit}
			</p>
			<p>
				Low of {Math.round(day.main.temp_min)}
				{unit}
			</p>
			<p>Humidity | {day.main.humidity}%</p>
			<p>Wind | {getWindSpeed(day.wind.speed)}km/h</p>
		</div>
	);
}
