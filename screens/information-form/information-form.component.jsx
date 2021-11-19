import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";

export default function InformationForm({ navigation }) {
	const nextPress = () => {
		navigation.push("MainApp");
	};
	const prevPress = () => {
		navigation.goBack();
	};
	return (
		<SafeAreaView style={styles.container}>
			<Text>Information Form Screen... tell us which groups to join</Text>
			<StatusBar style="auto" />
			<Button title="next" onPress={nextPress} />
			<Button title="prev" onPress={prevPress} />
		</SafeAreaView>
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
