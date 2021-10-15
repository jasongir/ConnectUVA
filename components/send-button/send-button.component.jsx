import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { pressedColor } from "../../misc/styleConstants";

const SendButton = ({ callback }) => {
	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: pressed ? pressedColor : "white",
				},
				styles.pressable,
			]}
			onPress={callback}
		>
			<Text style={styles.sendText}>SEND</Text>
		</Pressable>
	);
};

export default SendButton;

const styles = StyleSheet.create({
	sendText: {
		color: "darkblue",
		fontSize: 18,
	},
	pressable: {
		padding: 10,
		alignSelf: "center",
	},
});
