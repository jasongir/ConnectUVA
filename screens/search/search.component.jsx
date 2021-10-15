import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export default function Search({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				Searching is still under construction... check back soon!
			</Text>
			<Image
				source={require("../../assets/images/team-solving-problems.png")}
				style={styles.image}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	text: {
		fontSize: 20,
	},
	image: {
		width: 290,
		height: 290,
	},
});
