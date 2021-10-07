import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

import Avatar from "../avatar/avatar.component";
import MessageTimeStamp from "../message-time-stamp/message-time-stamp.component";

const GroupListItem = ({
	name,
	lastText,
	avatar,
	unreadMessageNumber,
	onPress,
}) => {
	const { text, timeStamp } = lastText;

	return (
		<Pressable onPress={onPress}>
			<View style={styles.item}>
				<Avatar avatar={avatar} name={name} />
				<View style={styles.textContainer}>
					<Text style={styles.itemTitle}>{name}</Text>
					<Text style={styles.itemSubtitle}>{text}</Text>
				</View>
				<View>
					<MessageTimeStamp timeStamp={timeStamp} />
				</View>
				<Text>{unreadMessageNumber}</Text>
			</View>
		</Pressable>
	);
};

export default GroupListItem;

const styles = StyleSheet.create({
	item: {
		width: "100%",
		padding: 15,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	textContainer: {
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "black",
		paddingRight: "30%",
	},
	itemTitle: {
		fontSize: 18,
	},
	itemSubtitle: {
		fontSize: 14,
		color: "#9e9f9f",
	},
});
