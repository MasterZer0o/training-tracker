export default function calculateDuration(target: any) {
	const regexp = /\d:\d{1,2}/g;
	const timeEndCell: Node = target.classList.contains('timeStart') ? target.nextSibling : target;
	const durationCell: Node = timeEndCell.nextSibling;
	const timeStartCell: Node = timeEndCell.previousSibling;

	setTimeout(() => {
		if (timeEndCell.textContent.match(regexp) && timeStartCell.textContent.match(regexp)) {
			const dateNow: Date = new Date(Date.now());
			const year: number = dateNow.getFullYear();
			const month: number = dateNow.getMonth();
			const day: number = dateNow.getDay();

			const timeStart = timeStartCell.textContent.split(':');
			const timeStartHour: number = parseInt(timeStart[0]);
			const timeStartMinutes: number = parseInt(timeStart[1]);

			const timeEnd = timeEndCell.textContent.split(':');
			const timeEndHour: number = parseInt(timeEnd[0]);
			const timeEndMinutes: number = parseInt(timeEnd[1]);

			const d1: any = new Date(year, month, day, timeStartHour, timeStartMinutes, 0, 0);
			const d2: any = new Date(year, month, day, timeEndHour, timeEndMinutes, 0, 0);

			console.log((d2 - d1) / 1000 / 60 + ' ' + 'minutes');
			const difference = (d2 - d1) / 1000 / 60;

			const differenceHours = Math.floor(difference / 60);
			const differenceMinutes = difference % 60;

			durationCell.textContent =
				differenceHours === 0 ? `${differenceMinutes}m` : `${differenceHours}h ${differenceMinutes}m`;
		} else {
			setTimeout(() => {
				durationCell.textContent = 'invalid';
			}, 500);
		}
	}, 500);
}
