export default function DayItemButton({ btnClick, children }) {
	return (
		<button
			className='bg-blue-800/15 border border-blue-800/50 rounded-md w-full cursor-pointer p-3 pl-8 flex flex-col justify-around text-left relative'
			onClick={btnClick}
			data-test='day-item-btn'
		>
			{children}
		</button>
	);
}
