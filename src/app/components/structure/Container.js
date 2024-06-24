export default function Container({ children }) {
	return (
		<div className='w-full p-4 mx-auto lg:max-w-4xl xl:max-w-5xl'>
			{children}
		</div>
	);
}
