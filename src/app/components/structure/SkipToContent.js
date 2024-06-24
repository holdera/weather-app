import Link from 'next/link';
export default function SkipToContent() {
	return (
		<Link
			href='#content'
			className='absolute bg-white text-blue-800 font-bold text-[0rem] text-center underline w-0 h-0 focus:relative focus:visible focus:w-auto focus:h-auto focus:text-base focus:p-4 focus:block'
		>
			Skip to Content
		</Link>
	);
}
