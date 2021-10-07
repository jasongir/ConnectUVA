// determines whether a Date object is today:
const isToday = (timeStamp) =>
	timeStamp.getDate == today.getDate() &&
	timeStamp.getMonth() == today.getMonth() &&
	timeStamp.getFullYear() == today.getFullYear();

// formats a date into a time string
const timeFromDate = (timeStamp) => {
	const minutes = timeStamp.getMinutes();
	const hours23 = timeStamp.getHours();
	const AM_PM = hours >= 12 ? "PM" : "AM";
	return "THIS ISN'T FINISHED";
};
