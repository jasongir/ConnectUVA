import { StatusBar } from "expo-status-bar";
import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	Pressable,
} from "react-native";

export default function SetupName({ navigation }) {
	const nextPress = () => {
		navigation.push("SetupUVAID");
	};
	const prevPress = () => {
		navigation.goBack();
	};
	const [textInputValue, setTextInputValue] = React.useState("");
	return (
		<View style={styles.container}>
			<Text style={styles.title}>What's your name?</Text>
			<StatusBar style="auto" />

			<TextInput
				style={styles.nameInput}
				onChangeText={(text) => setTextInputValue(text)}
				value={textInputValue}
				placeholder="i.e. John Doe"
			/>

			<Pressable style={styles.roundButton1} onPress={nextPress}>
				<Text style={styles.buttonText}>Submit</Text>
			</Pressable>

			<Pressable style={styles.goBack} onPress={prevPress}>
				<Text style={styles.subtitle}>Go back</Text>
			</Pressable>
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
	title: {
		fontSize: 22,
		fontWeight: "800",
		top: "-21%",
	},
	buttonText: {
		color: "white",
		textAlign: "center",
		fontSize: 18,
	},
	subtitle: {
		fontSize: 18,
		fontWeight: "800",
		top: "-17%",
		opacity: 0.4,
		paddingHorizontal: 50,
		textAlign: "center",
	},
	roundButton1: {
		backgroundColor: "black",
		padding: 18,
		borderRadius: 30,
		elevation: 5,
		width: "80%",
		height: 60,
		top: "0%",
	},
	goBack: {
		top: "38%",
		left: "-35%",
	},
	nameInput: {
		height: 50,
		width: "55%",
		top: "-10%",
		borderColor: "gray",
		borderWidth: 1,
		textAlign: "center",
		borderRadius: 30,
		fontSize: 18,
	},
});
