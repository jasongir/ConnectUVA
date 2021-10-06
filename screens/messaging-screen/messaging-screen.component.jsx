import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function MessagingScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text>Messaging Screen</Text>
			<StatusBar style="auto" />
			<Button title="Back" onPress={() => navigation.goBack()} />
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
