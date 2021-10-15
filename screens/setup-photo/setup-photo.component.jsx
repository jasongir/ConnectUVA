import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, Image, Pressable } from "react-native";

export default function SetupPhoto({ navigation }) {
	const nextPress = () => {
		navigation.push("InfoForm");
	};
	const prevPress = () => {
		navigation.goBack();
	};
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Add a profile picture</Text>
			<Text style={styles.subtitle}>Optional.</Text>
			<StatusBar style="auto" />

			<Image
				style={styles.addPhoto}
				source={require('../../assets/images/AddProfilePhoto.png')}
			/>

			<Pressable style={styles.roundButton1} onPress={nextPress}>
				<Text style={styles.buttonText}>Continue</Text>
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
		top: "-12%",
	},
	subtitle: {
		fontSize: 18,
		fontWeight: "800",
		top: "-9%",
		opacity: 0.4,
		paddingHorizontal: 50,
		textAlign: "center",
	},
	addPhoto: {
		width: "35%",
		height: "20%"
	},
	roundButton1: {
		backgroundColor: "black",
    padding: 18,
    borderRadius: 30,
		elevation: 5,
		width: "80%",
		height: 60,
		top: "10%"
  },
	buttonText: {
		color: 'white',
		textAlign: "center",
		fontSize: 18
	},
	goBack: {
		top: "29.5%",
		left: "-35%"
  },
});
