export default function calculateDuration(): void {
	const regexp = /\d:\d{1,2}/g;
	setTimeout(() => {
		if (
			document.querySelector<HTMLElement>('.timeEnd').textContent.match(regexp) &&
			document.querySelector<HTMLElement>('.timeStart').textContent.match(regexp)
		) {
			const dateNow: Date = new Date(Date.now());
			const year: number = dateNow.getFullYear();
			const month: number = dateNow.getMonth();
			const day: number = dateNow.getDay();

			const timeStart = document.querySelector('.timeStart').textContent.split(':');
			const timeStartHour: number = parseInt(timeStart[0]);
			const timeStartMinutes: number = parseInt(timeStart[1]);

			const timeEnd = document.querySelector('.timeEnd').textContent.split(':');
			const timeEndHour: number = parseInt(timeEnd[0]);
			const timeEndMinutes: number = parseInt(timeEnd[1]);

			const d1: any = new Date(year, month, day, timeStartHour, timeStartMinutes, 0, 0);
			const d2: any = new Date(year, month, day, timeEndHour, timeEndMinutes, 0, 0);

			console.log((d2 - d1) / 1000 / 60 + ' ' + 'minutes');
			const difference = (d2 - d1) / 1000 / 60;

			const differenceHours = Math.floor(difference / 60);
			const differenceMinutes = difference % 60;

			document.querySelector('.duration').textContent =
				differenceHours === 0 ? `${differenceMinutes}m` : `${differenceHours}h ${differenceMinutes}m`;
		} else {
			setTimeout(() => {
				document.querySelector('.duration').textContent = 'invalid';
			}, 1000);
		}
	}, 1000);
}
