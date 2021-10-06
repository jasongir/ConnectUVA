import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const GroupListItem = ({
	name,
	lastText,
	avatar,
	unreadMessageNumber,
	onPress,
}) => {
	return (
		<View>
			<Pressable onPress={onPress}>
				<Text>{name}</Text>
				{/* <Text>{lastText}</Text> */}
				<Text>{unreadMessageNumber}</Text>
			</Pressable>
		</View>
	);
};

export default GroupListItem;

const styles = StyleSheet.create({});
