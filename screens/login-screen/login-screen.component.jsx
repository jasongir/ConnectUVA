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
				<Text>Login Screen</Text>
				<Text>Enter your email:</Text>
				<TextInput
					onChangeText={setEmail}
					value={email}
					placeholder="computingid@virginia.edu"
					keyboardType="email-address"
				/>
				<TextInput
					onChangeText={setPassword}
					value={password}
					placeholder="password"
					textContentType="password"
					secureTextEntry
				/>
				{error && <Text>Error: {error.message}</Text>}
				<Pressable onPress={onSubmitHandler}>
					<Text>Log into ConnectUVA</Text>
				</Pressable>
				{loading && <Text>Logging into ConnectUVA...</Text>}
				<Text>For first-time users:</Text>
				<Pressable onPress={signupPress}>
					<Text>Sign up</Text>
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
