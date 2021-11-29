import React, { useState, useEffect } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
} from "react-native";

import firebaseApp from "../../firebase/config";
import { getAuth } from "firebase/auth";
import {
	useCreateUserWithEmailAndPassword,
	useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

const SignupScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(getAuth(firebaseApp));

	const onSubmitHandler = () => {
		signInWithEmailAndPassword(email, password);
	};
	const signupPress = () => navigation.push("SignupScreen");

	useEffect(() => {
		if (user) navigation.push("MainApp");
	}, [user]);

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.title}>Login Screen</Text>
				<Text>Enter your email:</Text>
				<TextInput
					onChangeText={setEmail}
					value={email}
					placeholder="computingid@virginia.edu"
					keyboardType="email-address"
					style={styles.nameInput}
				/>
				<TextInput
					style={styles.nameInput}
					onChangeText={setPassword}
					value={password}
					placeholder="password"
					textContentType="password"
					secureTextEntry
				/>
				{error && <Text>Error: {error.message}</Text>}
				<Pressable onPress={onSubmitHandler} style={styles.roundButton1}>
					<Text style={styles.buttonText}>Log into ConnectUVA</Text>
				</Pressable>
				{loading && <Text>Logging into ConnectUVA...</Text>}
				<Text>For first-time users:</Text>
				<Pressable onPress={signupPress} style={[styles.roundButton1]}>
					<Text style={styles.buttonText}>Sign up</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default SignupScreen;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 30,
		fontWeight: "800",
		top: "-21%",
	},
	subtitle: {
		fontSize: 18,
		fontWeight: "800",
		top: "-17%",
		opacity: 0.4,
		paddingHorizontal: 50,
		textAlign: "center",
	},
	phoneInput: {
		height: 50,
		width: "55%",
		top: "-10%",
		borderColor: "gray",
		borderWidth: 1,
		textAlign: "center",
		borderRadius: 30,
		fontSize: 18,
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
		top: "0%",
	},
	goBack: {
		top: "35%",
		left: "-35%",
	},
	nameInput: {
		height: 50,
		width: "70%",
		// top: "-10%",
		borderColor: "gray",
		borderWidth: 1,
		textAlign: "center",
		borderRadius: 30,
		fontSize: 18,
	},
});
