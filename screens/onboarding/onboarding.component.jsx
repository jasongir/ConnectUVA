import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, Text, View, Button, Image, Pressable } from "react-native";

export default function Onboarding({ navigation }) {
	const nextPress = () => {
		navigation.push("PhoneVerification");
	};
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sign up for ConnectUVA</Text>
			<Text style={styles.subtitle}>Create an account and join your first UVA group!</Text>
			<StatusBar style="auto" />
			<Image
				style={styles.uvalogo}
				source={require('../../assets/images/uva_logo2.png')}
			/>

			<Pressable style={styles.roundButton1} onPress={nextPress}>
  			<Text style={styles.buttonText}>Continue with phone</Text>
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
		fontSize: 32,
		fontWeight: "800",
		top: "-7%",
		textAlign: "center",
		paddingHorizontal: 50,
	},
	subtitle: {
		fontSize: 18,
		fontWeight: "800",
		top: "35%",
		opacity: 0.4,
		paddingHorizontal: 50,
		textAlign: "center",
	},
	buttonText: {
		color: 'white',
		textAlign: "center",
		fontSize: 18
	},
	roundButton1: {
		backgroundColor: "black",
    padding: 18,
    borderRadius: 30,
		elevation: 5,
		width: "80%",
		height: 60,
		top: "16%"
  },
	uvalogo: {
		width: "80%",
		height: 225,
		top: "-5%"
  },
});
