'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { buttonStyles } from './styles/ui';

export default function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	function setDarkTheme() {
		setTheme('dark');
	}

	function setLightTheme() {
		setTheme('light');
	}

	function setModeByTime() {
		const currentDay = new Date();
		const time = currentDay.getHours();
		if (time > 19) {
			setDarkTheme();
		} else {
			setLightTheme();
		}
	}

	useEffect(() => {
		setMounted(true);
		setModeByTime();
	}, []);

	if (!mounted) {
		return null;
	}

	function themeHandler() {
		if (theme === 'light') {
			setDarkTheme();
		} else {
			setLightTheme();
		}
	}

	return (
		<div className='flex justify-center mt-3'>
			<button className={buttonStyles} onClick={themeHandler}>
				Switch to {theme === 'light' ? 'Dark' : 'Light'}
			</button>
		</div>
	);
}
