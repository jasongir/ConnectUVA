import {
	StyleSheet,
	Text,
	View,
	Pressable,
	useWindowDimensions,
} from "react-native";
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
	groupId,
}) => {
	const { text, timeStamp } = lastText;

	const window = useWindowDimensions();

	const onPress = () =>
		navigation.push("MessagingScreen", {
			groupName: name,
			groupId,
		});

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				{
					backgroundColor: pressed ? pressedColor : "white",
					width: window.width,
				},
				// { borderStyle: "solid", borderColor: "black", borderWidth: 1 },
			]}
		>
			<View style={styles.item}>
				<Avatar style={styles.avatar} avatar={avatar} name={name} />
				<View style={styles.textContainer}>
					<Text style={styles.itemTitle}>{name}</Text>
					<Text style={styles.itemSubtitle}>{text}</Text>
				</View>
				<View
					style={[
						styles.groupEnd,
						// { borderStyle: "solid", borderColor: "black", borderWidth: 1 },
					]}
				>
					<View style={styles.paddingBottom10}>
						<MessageTimeStamp timeStamp={timeStamp.toDate()} />
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
		padding: 10,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	textContainer: {
		// borderWidth: 1,
		// borderStyle: "solid",
		// borderColor: "black",
		paddingHorizontal: 15,
		flex: 6,
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
		flex: 1,
	},
	groupEnd: {
		alignSelf: "flex-end",
		marginRight: 2,

		display: "flex",
		flexDirection: "column",
		alignItems: "center",

		height: "100%",
		flex: 2,
	},
	paddingBottom10: {
		paddingBottom: 10,

		// borderStyle: "solid",
		// borderColor: "black",
		// borderWidth: 1,
	},
});
