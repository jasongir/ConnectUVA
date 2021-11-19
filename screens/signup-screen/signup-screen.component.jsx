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
				<Text>Sign up Screen</Text>
				<Text>Enter your email:</Text>
				<TextInput
					onChangeText={setEmail}
					value={email}
					placeholder="computingid@virginia.edu"
					keyboardType="email-address"
				/>
				<TextInput
					onChangeText={setPassword1}
					value={password1}
					placeholder="password"
					textContentType="password"
					secureTextEntry
				/>
				<TextInput
					onChangeText={setPassword2}
					value={password2}
					placeholder="confirm password"
					textContentType="password"
					secureTextEntry
				/>
				{!!errorMessage && <Text>Error: {errorMessage}</Text>}
				{error && <Text>Error: {error.message}</Text>}
				<Pressable onPress={onSubmitHandler}>
					<Text>Sign up</Text>
				</Pressable>
				{loading && <Text>Loading new user...</Text>}

				<Text>For returning users:</Text>
				<Pressable onPress={loginPress}>
					<Text>Login up</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default SignupScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
