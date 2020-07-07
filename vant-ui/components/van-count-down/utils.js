
export function padZero(num , targetLength = 2) {
  let str = num + '';

  while (str.length < targetLength) {
    str = '0' + str;
  }

  return str;
}


const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function parseTimeData(time) {
	const days = Math.floor(time / DAY);
	const hours = Math.floor((time % DAY) / HOUR);
	const minutes = Math.floor((time % HOUR) / MINUTE);
	const seconds = Math.floor((time % MINUTE) / SECOND);
	const milliseconds = Math.floor(time % SECOND);

	return {
		days,
		hours,
		minutes,
		seconds,
		milliseconds,
	};
}


export function parseFormat(format, timeData) {
	const {
		days
	} = timeData;
	let {
		hours,
		minutes,
		seconds,
		milliseconds
	} = timeData;
	
	let format = {};
	
	

	if (format.indexOf('DD') === -1) {
		hours += days * 24;
	} else {
		format = format.replace('DD', padZero(days));
	}

	if (format.indexOf('HH') === -1) {
		minutes += hours * 60;
	} else {
		format = format.replace('HH', padZero(hours));
	}

	if (format.indexOf('mm') === -1) {
		seconds += minutes * 60;
	} else {
		format = format.replace('mm', padZero(minutes));
	}

	if (format.indexOf('ss') === -1) {
		milliseconds += seconds * 1000;
	} else {
		format = format.replace('ss', padZero(seconds));
	}

	if (format.indexOf('S') !== -1) {
		const ms = padZero(milliseconds, 3);

		if (format.indexOf('SSS') !== -1) {
			format = format.replace('SSS', ms);
		} else if (format.indexOf('SS') !== -1) {
			format = format.replace('SS', ms.slice(0, 2));
		} else {
			format = format.replace('S', ms.charAt(0));
		}
	}

	return format;
}


export function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}