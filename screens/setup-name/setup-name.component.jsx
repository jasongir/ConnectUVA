import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	Pressable,
} from "react-native";

import firebaseApp from "../../firebase/config";
import { getAuth } from "@firebase/auth";
import { getFirestore, doc, setDoc } from "@firebase/firestore";

export default function SetupName({ navigation }) {
	const [user, setUser] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	useEffect(() => {
		(async () => {
			const user = getAuth(firebaseApp).currentUser;
			setUser(user);

			if (!user) navigation.navigate("Onboarding");
		})();
	}, []);

	const prevPress = () => {
		navigation.goBack();
	};
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const onSubmit = async () => {
		if (!firstName || !lastName) {
			setErrorMessage("must include first and last name.");
			return;
		}
		try {
			const firestore = getFirestore(firebaseApp);
			const newUserRef = await setDoc(doc(firestore, "users", user.uid), {
				id: user.uid,
				firstName,
				lastName,
				email: user.email,
				groups: [],
			});

			navigation.push("InformationForm");
		} catch (err) {
			setErrorMessage(String(err));
			console.log(err);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>What's your name?</Text>
			<StatusBar style="auto" />

			<TextInput
				style={styles.nameInput}
				onChangeText={setFirstName}
				value={firstName}
				placeholder="first name"
				keyboardType="default"
			/>
			<TextInput
				style={styles.nameInput}
				onChangeText={setLastName}
				value={lastName}
				placeholder="last name"
				keyboardType="default"
			/>

			{!!errorMessage && <Text>Error: {String(errorMessage)}</Text>}

			<Pressable style={styles.roundButton1} onPress={onSubmit}>
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
