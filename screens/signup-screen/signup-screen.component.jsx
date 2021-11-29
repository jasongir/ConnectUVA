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
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const SignupScreen = ({ navigation }) => {
	// all the controlled information user provides

	const [email, setEmail] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");

	const [errorMessage, setErrorMessage] = useState("");

	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(getAuth(firebaseApp));

	const onSubmitHandler = async () => {
		try {
			if (password1 !== password2) {
				setErrorMessage("Your passwords did not match.");
				return;
			}
			await createUserWithEmailAndPassword(email, password1);
		} catch (error) {
			setErrorMessage(error);
		}
	};

	useEffect(() => {
		if (user) {
			navigation.push("SetupName");
		}
	}, [user]);

	const loginPress = () => navigation.push("LoginScreen");
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.title}>Sign up Screen</Text>
				<Text>Enter your email:</Text>
				<TextInput
					style={styles.nameInput}
					onChangeText={setEmail}
					value={email}
					placeholder="computingid@virginia.edu"
					keyboardType="email-address"
				/>
				<TextInput
					style={styles.nameInput}
					onChangeText={setPassword1}
					value={password1}
					placeholder="password"
					textContentType="password"
					secureTextEntry
				/>
				<TextInput
					style={styles.nameInput}
					onChangeText={setPassword2}
					value={password2}
					placeholder="confirm password"
					textContentType="password"
					secureTextEntry
				/>
				{!!errorMessage && <Text>Error: {errorMessage}</Text>}
				{error && <Text>Error: {error.message}</Text>}
				<Pressable onPress={onSubmitHandler} style={styles.roundButton1}>
					<Text style={styles.buttonText}>Sign up</Text>
				</Pressable>
				{loading && <Text>Loading new user...</Text>}

				<Text>For returning users:</Text>
				<Pressable style={styles.roundButton1} onPress={loginPress}>
					<Text style={styles.buttonText}>Login</Text>
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
