import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { timeFromDate } from "../../misc/timeFunctions";

const Message = ({ content, user, timeStamp, currentUserId }) => {
	// console.log(currentUserId);

	const { firstName, lastName } = user;
	return (
		<View style={styles.messageContainer}>
			{currentUserId === user.id ? (
				// if it is our message
				<View style={styles.ownMessageContainer}>
					<View style={[styles.ownMessage, styles.message]}>
						<Text>{content}</Text>
					</View>
					<Text style={[styles.timeStamp, styles.ownTimeStamp]}>
						{timeFromDate(timeStamp)}
					</Text>
				</View>
			) : (
				// if it's someone else's message
				<View style={styles.otherMessageContainer}>
					<Text style={styles.name}>
						{firstName} {lastName ? `${lastName.slice(0, 1)}.` : ""}
					</Text>
					<View style={[styles.otherMessage, styles.message]}>
						<Text>{content}</Text>
					</View>
					<Text style={[styles.timeStamp]}>{timeFromDate(timeStamp)}</Text>
				</View>
			)}
		</View>
	);
};

export default Message;

const styles = StyleSheet.create({
	messageContainer: {
		padding: 4,
		width: "100%",
		// borderWidth: 1,
		// borderColor: "black",
		// borderStyle: "solid",
	},
	message: {
		backgroundColor: "#EEEEEE",
		maxWidth: "70%",
		padding: 10,
	},
	timeStamp: {
		fontSize: 11,
		color: "#9E9F9F",
	},
	ownMessageContainer: {
		alignSelf: "flex-end",
	},
	ownMessage: {
		alignSelf: "flex-end",
		borderBottomLeftRadius: 10,
		borderTopLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	ownTimeStamp: {
		alignSelf: "flex-end",
	},
	otherMessageContainer: {
		alignSelf: "flex-start",
	},
	otherMessage: {
		alignSelf: "flex-start",
		borderBottomLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},
	name: {
		fontSize: 12,
	},
});
