export default function Footer() {
	const d = new Date();
	const year = d.getFullYear();

	return (
		<footer className='bg-black border-t border-white p-4 pt-5 text-white  text-center'>
			<p>&copy; {year} Alannah Holder</p>
		</footer>
	);
}
