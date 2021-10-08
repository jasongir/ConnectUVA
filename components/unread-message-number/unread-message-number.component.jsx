import React from "react";
import { StyleSheet, Text, View } from "react-native";

const UnreadMessageNumber = ({ number }) => {
	return (
		<View>
			{number ? (
				<View style={styles.circle}>
					<Text style={styles.text}>{number}</Text>
				</View>
			) : null}
		</View>
	);
};

export default UnreadMessageNumber;

const widthHeight = 25;

const styles = StyleSheet.create({
	circle: {
		width: widthHeight,
		height: widthHeight,
		backgroundColor: "#303030",
		borderRadius: 999,

		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "#FDFDFD",
	},
});
