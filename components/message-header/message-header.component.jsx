import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { pressedColor } from "../../misc/styleConstants";
import { headerTopPadding } from "../../misc/styleConstants";

const MessageHeader = ({ groupName, navigation }) => {
	const goBack = () => navigation.goBack();
	const moreGroupInfo = () => console.log("that doesn't work yet");

	return (
		<View style={styles.header}>
			<Pressable
				onPress={goBack}
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? pressedColor : "white",
					},
					styles.backButton,
				]}
			>
				<Ionicons name="arrow-back" size={38} color={"black"} />
			</Pressable>
			<Text style={styles.title}>{groupName}</Text>
			<Pressable
				onPress={moreGroupInfo}
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? pressedColor : "white",
					},
					styles.moreButton,
				]}
			>
				<Ionicons name="ellipsis-vertical" size={35} color={"black"} />
			</Pressable>
		</View>
	);
};

export default MessageHeader;

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-end",
		width: "100%",
		paddingTop: headerTopPadding,
		paddingBottom: 20,
		paddingHorizontal: 30,
	},
	title: {
		paddingLeft: 20,
		fontSize: 30,
		fontWeight: "700",
		marginHorizontal: "auto",
	},
	backButton: {
		// marginRight: "auto",
	},
	moreButton: {
		marginLeft: "auto",
	},
});
