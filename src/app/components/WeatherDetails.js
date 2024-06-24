import Line from './Line';
import { getWindSpeed } from '../utils/helpers';

export default function WeatherDetails({ day }) {
	return (
		<div className='temp'>
			<p className='font-semibold'>
				{Math.round(day.main.temp)}
				&#8451;
			</p>
			<p>
				Feels like {Math.round(day.main.feels_like)}
				&#8451;
			</p>

			<div className='flex justify-center'>
				<p className='leading-[1.5] md:leading-[inherit]'>
					High of {Math.round(day.main.temp_max)}
					&#8451; <Line /> Low&nbsp;of {Math.round(day.main.temp_min)}
					&#8451;
				</p>
			</div>

			<p>
				Humidity <Line /> {day.main.humidity}%
			</p>
			<p>
				Wind <Line /> {getWindSpeed(day.wind.speed)}km/h
			</p>
		</div>
	);
}
