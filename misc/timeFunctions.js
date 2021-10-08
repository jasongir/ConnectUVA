// determines whether a Date object is today:
export const isToday = (timeStamp) => {
	const today = new Date();

	return (
		timeStamp.getDate() == today.getDate() &&
		timeStamp.getMonth() == today.getMonth() &&
		timeStamp.getFullYear() == today.getFullYear()
	);
};

// formats a date into a time string
export const timeFromDate = (timeStamp) => {
	const minutes = timeStamp.getMinutes();
	const hours23 = timeStamp.getHours();
	const AM_PM = hours23 >= 12 ? "PM" : "AM";

	const newHours = hours23 === 0 || hours23 === 12 ? 12 : hours23 % 12;
	const finalMinutes = minutes < 10 ? `0${minutes}` : minutes;

	return `${newHours}:${finalMinutes} ${AM_PM}`;
};

// TESTING:
// const today = new Date("October 8, 2021 1:53 PM");

// const oct8 = new Date("October 8, 2021");
// const oct6 = new Date("October 6, 2021");

// console.log("this is today: " + isToday(oct8));
// console.log("this is not today: " + isToday(oct6));

// const twelveAM = new Date("November 2, 1943 12:00 AM");
// console.log(`expected 12:00 AM : ${timeFromDate(twelveAM)}`);

// const twelvePM = new Date("November 2, 1943 12:00 PM");
// console.log(`expected 12:00 PM : ${timeFromDate(twelvePM)}`);

// const eleven59AM = new Date("November 2, 1943 11:59 AM");
// console.log(`expected 11:59 AM : ${timeFromDate(eleven59AM)}`);

// const eleven59PM = new Date("November 2, 1943 11:59 PM");
// console.log(`expected 11:59 PM : ${timeFromDate(eleven59PM)}`);

// const oneAM = new Date("November 2, 1943 1:00 AM");
// console.log(`expected 1:00 AM : ${timeFromDate(oneAM)}`);

// const onePM = new Date("November 2, 1943 1:00 PM");
// console.log(`expected 1:00 PM : ${timeFromDate(onePM)}`);
