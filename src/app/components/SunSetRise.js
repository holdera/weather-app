import { convertTime } from '../utils/helpers';

export default function SunSetRise({ sunrise, sunset }) {
	return (
		<div className='flex justify-between w-40 text-center'>
			<div>
				<p>
					<b>Sunrise</b>
				</p>
				<p>{convertTime(sunrise)}</p>
			</div>
			<div>
				<p>
					<b>Sunset</b>
				</p>
				<p>{convertTime(sunset)}</p>
			</div>
		</div>
	);
}
