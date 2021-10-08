import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { timeFromDate } from "../../misc/timeFunctions";

const Message = ({ content, user, timeStamp, currentUser }) => {
	const { firstName, lastName } = user;
	return (
		<View style={styles.message}>
			<Text>
				{firstName} {lastName}
			</Text>
			<Text>{content}</Text>
			<Text>{timeFromDate(timeStamp)}</Text>
		</View>
	);
};

export default Message;

const styles = StyleSheet.create({
	message: {
		padding: 10,
	},
});
