import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

import Avatar from "../avatar/avatar.component";
import MessageTimeStamp from "../message-time-stamp/message-time-stamp.component";
import UnreadMessageNumber from "../../components/unread-message-number/unread-message-number.component";

import { pressedColor } from "../../misc/styleConstants";

const GroupListItem = ({
	navigation,
	name,
	lastText,
	avatar,
	unreadMessageNumber,
}) => {
	const { text, timeStamp } = lastText;

	const onPress = () =>
		navigation.push("MessagingScreen", {
			groupName: name,
		});

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => ({
				backgroundColor: pressed ? pressedColor : "white",
			})}
		>
			<View style={styles.item}>
				<Avatar style={styles.avatar} avatar={avatar} name={name} />
				<View style={styles.textContainer}>
					<Text style={styles.itemTitle}>{name}</Text>
					<Text style={styles.itemSubtitle}>{text}</Text>
				</View>
				<View style={styles.groupEnd}>
					<View style={styles.paddingBottom10}>
						<MessageTimeStamp timeStamp={timeStamp} />
					</View>
					<UnreadMessageNumber number={unreadMessageNumber} />
				</View>
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
		alignItems: "flex-start",
	},
	textContainer: {
		// borderWidth: 1,
		// borderStyle: "solid",
		// borderColor: "black",
		paddingRight: "30%",
	},
	itemTitle: {
		fontSize: 18,
	},
	itemSubtitle: {
		fontSize: 14,
		color: "#9e9f9f",
	},
	avatar: {
		alignSelf: "flex-start",
	},
	groupEnd: {
		alignSelf: "flex-end",

		display: "flex",
		flexDirection: "column",
		alignItems: "center",

		height: "100%",
	},
	paddingBottom10: {
		paddingBottom: 10,
	},
});
