import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function SetupName({ navigation }) {
	const nextPress = () => {
		navigation.push("InfoForm");
	};
	const prevPress = () => {
		navigation.goBack();
	};
	return (
		<View style={styles.container}>
			<Text>Setup Name Screen</Text>
			<StatusBar style="auto" />
			<Button title="next" onPress={nextPress} />
			<Button title="prev" onPress={prevPress} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
