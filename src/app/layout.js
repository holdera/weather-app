import { Poppins } from 'next/font/google';
import './styles/globals.css';
import Header from './components/structure/Header';
import Footer from './components/structure/Footer';

const poppins = Poppins({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
});

export const metadata = {
	title: 'Weather App',
	description:
		'An application thats displays the weather for the next 5 days.',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={poppins.className}>
				<Header />
				<main id='content' className='min-h-[100vh]'>
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
