export default function Hero({ children, ...props }) {
	return (
		<div
			className='bg-blue-800/25 rounded-md p-5 mb-7 border border-blue-800/50 md:p-6 dark:bg-blue-800/10'
			{...props}
		>
			{children}
		</div>
	);
}
