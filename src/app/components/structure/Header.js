'use client';
import Image from 'next/image';
import SkipToContent from './SkipToContent';
import weatherIcon from '../../../../public/images/weather.svg';

export default function Header() {
	return (
		<>
			<SkipToContent />
			<header className='bg-black text-white p-4'>
				<div className='flex justify-center mx-auto md:w-[90%] lg:w-full lg:max-w-[1000px]'>
					<span className='font-bold text-[1.25rem] flex md:text-2xl'>
						<Image priority src={weatherIcon} alt='' />
						<span>Weather Forecast</span>
					</span>
				</div>
			</header>
		</>
	);
}
