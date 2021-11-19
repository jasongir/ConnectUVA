import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, Pressable } from "react-native";

import firebaseApp from "../../firebase/config";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Onboarding({ navigation }) {
	const [user, loading, error] = useAuthState(getAuth(firebaseApp));
	useEffect(() => {
		if (user) navigation.push("MainApp");
	}, [user]);

	const signupPress = () => {
		navigation.push("SignupScreen");
	};
	const loginPress = () => {
		navigation.push("LoginScreen");
	};
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sign up for ConnectUVA</Text>
			<Text style={styles.subtitle}>
				Create an account and join your first UVA group!
			</Text>
			<StatusBar style="auto" />
			<Image
				style={styles.uvalogo}
				source={require("../../assets/images/uva_logo2.png")}
			/>
			{loading && <Text>Loading user information...</Text>}
			{error && <Text>Firebase error: {error.message}</Text>}
			<Pressable style={styles.roundButton1} onPress={signupPress}>
				<Text style={styles.buttonText}>Sign up</Text>
			</Pressable>
			<Pressable style={styles.roundButton1} onPress={loginPress}>
				<Text style={styles.buttonText}>Log in</Text>
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
		color: "white",
		textAlign: "center",
		fontSize: 18,
	},
	roundButton1: {
		backgroundColor: "black",
		padding: 18,
		borderRadius: 30,
		elevation: 5,
		width: "80%",
		height: 60,
		top: "16%",
	},
	uvalogo: {
		width: "80%",
		height: 225,
		top: "-5%",
	},
});
