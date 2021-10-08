import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { isToday, timeFromDate, formatDate } from "../../misc/timeFunctions";

const MessageTimeStamp = ({ timeStamp }) => {
	const tsIsToday = isToday(timeStamp);

	const finalMessage = tsIsToday
		? timeFromDate(timeStamp)
		: formatDate(timeStamp);

	return (
		<View>
			<Text style={styles.text}>{finalMessage}</Text>
		</View>
	);
};

export default MessageTimeStamp;

const styles = StyleSheet.create({
	text: {
		fontSize: 12,
		color: "#9e9f9f",
	},
});
