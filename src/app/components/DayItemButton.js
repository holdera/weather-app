import Line from './Line';
export default function DayItemButton({ btnClick, date, temp, humidity }) {
	return (
		<button
			className='bg-blue-800/15 border border-blue-800/50 rounded-md w-full cursor-pointer p-3'
			onClick={btnClick}
		>
			<p className='date font-semibold'>{date}</p>
			<h3 className='bold text-lg'>Average Temperature</h3>
			<p className='font-bold mt-2'>{temp}</p>
			<p>
				Humidity <Line /> {humidity}%
			</p>
		</button>
	);
}
