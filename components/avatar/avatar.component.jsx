import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Avatar = ({ avatar, name }) => {
	const initials = name
		.split(" ")
		.map((word) => word.charAt(0))
		.join("")
		.toUpperCase();

	return avatar ? ( // if we get info passed about an actual picture:
		<View style={styles.avatar}></View>
	) : (
		<View style={styles.placeholder}>
			<Text>{initials}</Text>
		</View>
	);
};

export default Avatar;

const styles = StyleSheet.create({
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#EEEEEE",
	},
	placeholder: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#EEEEEE",

		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
});
