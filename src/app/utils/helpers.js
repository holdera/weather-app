export function calculateMean(values) {
	const total = values.reduce((acc, value) => acc + value, 0);
	return Math.floor(total / values.length);
}

export function convertKelvinToCelsius(temp) {
	return Math.round(temp - 273.15);
}

export function convertKelvinToFah(temp) {
	return Math.round((temp - 273.15) * 1.8 + 32);
}

export function convertTime(time) {
	const theTime = new Date(time * 1000);
	const hours = theTime.getHours();
	const minutes = theTime.getMinutes();
	const AmOrPm = hours < 12 ? 'AM' : 'PM';

	const formattedTime = `${String(hours).padStart(2, '')}:${String(
		minutes
	).padStart(2, '0')} ${AmOrPm}`;
	return formattedTime;
}

export function getWindSpeed(speed) {
	const windSpeed = (speed * 3.6).toFixed(2);
	return Math.floor(windSpeed);
}

export function formatDate(date) {
	const completeDate = new Date(date.replace(' ', 'T'));
	const formattedDate = completeDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	const formattedTime = completeDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	});
	const wholeFormattedDateTime = `${formattedDate}, ${formattedTime}`;
	return wholeFormattedDateTime;
}

export function formatDay(day) {
	const date = new Date(day);
	return date.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function formatTime(theTime) {
	const time = new Date(theTime);
	return time.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	});
}

export function getCurrentDateTime() {
	const currentDate = new Date();
	const today = formatDay(currentDate);
	const time = formatTime(currentDate);
	return {
		today,
		time,
	};
}
