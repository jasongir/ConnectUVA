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

	const { width, height } = useWindowDimensions();

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.title}>Login Screen</Text>
				<Text style={styles.subtitle}>Enter your email:</Text>
				<TextInput
					onChangeText={setEmail}
					value={email}
					placeholder="computingid@virginia.edu"
					keyboardType="email-address"
					style={[styles.nameInput, { width: width * 0.65 }]}
				/>
				<Text style={styles.subtitle}>And your password:</Text>
				<TextInput
					style={[styles.nameInput, { width: width * 0.65 }]}
					onChangeText={setPassword}
					value={password}
					placeholder="password"
					textContentType="password"
					secureTextEntry
				/>
				{error && <Text>Error: {error.message}</Text>}
				<Pressable
					onPress={onSubmitHandler}
					style={[styles.roundButton1, { width: width * 0.5 }]}
				>
					<Text style={styles.buttonText}>Login</Text>
				</Pressable>
				{loading && <Text>Logging into ConnectUVA...</Text>}
				<Pressable
					onPress={signupPress}
					style={[
						styles.roundButton2,
						{ width: width * 0.5, marginTop: "25%" },
					]}
				>
					<Text style={styles.buttonText2}>Sign up</Text>
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
	},
});
