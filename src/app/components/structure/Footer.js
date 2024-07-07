export default function Footer() {
	const d = new Date();
	const year = d.getFullYear();

	return (
		<footer className='bg-blue-800/10 border-t border-blue-900 p-4 pt-5 text-center dark:bg-black dark:border-white dark:text-white'>
			<p>&copy; {year} Alannah Holder</p>
		</footer>
	);
}
