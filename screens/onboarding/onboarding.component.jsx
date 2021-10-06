import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Onboarding({ navigation }) {
	const nextPress = () => {
		navigation.push("PhoneVerification");
	};
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Onboarding Screen</Text>
			<StatusBar style="auto" />
			<Button title="next" onPress={nextPress} />
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
	text: {},
});
