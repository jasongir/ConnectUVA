import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Passed in an actual picture or the name (inserts initials)
const Avatar = ({ avatar, name, size, textColor }) => {
	const initials = name
		.split(" ")
		.map((word) => word.charAt(0))
		.join("")
		.toUpperCase();

	return avatar ? ( // if we get info passed about an actual picture:
		<View style={[styles.avatar, size ? { width: size, height: size, borderRadius: size/2 } : {}]}>
			{avatar}
		</View>
	) : (
		<View
			style={[styles.placeholder, size ? { width: size, height: size, borderRadius: size/2} : {}]}
		>
			<Text
				style={[
					styles.text,
					size ? { fontSize: Math.floor((size * 16) / 50) } : null,
					textColor ? { color: textColor } : null,
				]}
			>
				{initials}
			</Text>
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
	text: {
		fontSize: 16,
	},
});
