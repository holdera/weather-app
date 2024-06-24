import { formatTime } from '../utils/helpers';

export default function DayDetails({ day, ...props }) {
	return (
		<div {...props}>
			<p>{formatTime(day.dt_txt)}</p>
			<h3 className='font-semibold'>Weather Forecast</h3>
			{day.weather.map((weather) => (
				<div key={weather.id}>
					<img
						className='m-auto'
						src={`https://openweathermap.org/img/w/${weather.icon}.png`}
						alt=''
					/>
					<p className='capitalize'>{weather.description}</p>
				</div>
			))}
		</div>
	);
}
