import React, { useState, useEffect } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
	useWindowDimensions,
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

	const { width } = useWindowDimensions();

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.title}>Sign up</Text>
				<Text style={styles.subtitle}>Enter your email:</Text>
				<TextInput
					style={[styles.nameInput, { width: width * 0.65 }]}
					onChangeText={setEmail}
					value={email}
					placeholder="computingid@virginia.edu"
					keyboardType="email-address"
				/>
				<Text style={styles.subtitle}>And your password:</Text>
				<TextInput
					style={[styles.nameInput, { width: width * 0.65 }]}
					onChangeText={setPassword1}
					value={password1}
					placeholder="password"
					textContentType="password"
					secureTextEntry
				/>
				<TextInput
					style={[styles.nameInput, { width: width * 0.65 }]}
					onChangeText={setPassword2}
					value={password2}
					placeholder="confirm password"
					textContentType="password"
					secureTextEntry
				/>
				{!!errorMessage && <Text>Error: {errorMessage}</Text>}
				{error && <Text>Error: {error.message}</Text>}
				<Pressable
					onPress={onSubmitHandler}
					style={[styles.roundButton1, { width: width * 0.5 }]}
				>
					<Text style={styles.buttonText}>Sign up</Text>
				</Pressable>
				{loading && <Text>Loading new user...</Text>}

				<Pressable
					style={[
						styles.roundButton2,
						{ width: width * 0.5, marginTop: "20%" },
					]}
					onPress={loginPress}
				>
					<Text style={styles.buttonText2}>Or Login</Text>
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
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	title: {
		fontSize: 30,
		fontWeight: "800",
		paddingTop: "25%",
		textAlign: "center",
	},
	subtitle: {
		fontSize: 18,
		fontWeight: "800",
		opacity: 0.4,
		paddingHorizontal: 50,
		paddingTop: "10%",
		textAlign: "center",
	},
	buttonText: {
		color: "white",
		textAlign: "center",
		fontSize: 18,
	},
	roundButton1: {
		alignSelf: "center",
		backgroundColor: "black",
		padding: 16,
		borderRadius: 30,
		elevation: 5,
		width: "80%",
		marginTop: 20,
	},
	roundButton2: {
		alignSelf: "center",
		backgroundColor: "white",
		padding: 16,
		borderColor: "black",
		borderWidth: 3,
		borderStyle: "solid",
		borderRadius: 30,
		elevation: 5,
		width: "80%",
		top: "0%",
	},
	buttonText2: {
		color: "black",
		textAlign: "center",
		fontSize: 18,
	},

	goBack: {
		top: "35%",
		left: "-35%",
	},
	nameInput: {
		height: 50,
		width: "70%",
		borderColor: "gray",
		borderWidth: 1,
		textAlign: "center",
		borderRadius: 30,
		fontSize: 18,
		textAlign: "center",
		alignSelf: "center",
	},
});
