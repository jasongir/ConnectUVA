import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	ScrollView,
	Alert,
	KeyboardAvoidingView,
	DatePickerIOS,
	Pressable,
} from "react-native";
//import { Avatar } from "react-native-elements";
import Avatar from "../../components/avatar/avatar.component";

import { ListItem, Icon, Input } from "react-native-elements";

import Ionicons from "@expo/vector-icons/Ionicons";
import { signOut, getAuth } from "@firebase/auth";
import firebaseApp from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function myProfile({ navigation }) {
	const savePress = () => {
		Alert.alert("Changes have been saved");
		navigation.pop();
	};

	const showDatePicker = () => {
		return <DatePickerIOS value={date} mode="date" onChange={onChange} />;
	};

	const auth = getAuth(firebaseApp);
	const logout = () => signOut(auth);

	const [user, loading, error] = useAuthState(auth);
	useEffect(() => {
		if (!user) navigation.navigate("Onboarding");
	}, [user]);

	account = {
		name: "Sam Galletta",
		dob: "09/06/2000",
		email: "sjg7egt@virginia.edu",
	};

	const size = 150;
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Account</Text>
			</View>
			<KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
				<ScrollView>
					<View style={styles.avatar}>
						<Avatar style={styles.avatar} name="Sam Galletta" size={size} />
					</View>

					<Input
						placeholder={account.name}
						autoCapitalize="words"
						label="Full Name"
					/>
					<Input
						placeholder={account.email}
						textContentType="emailAddress"
						label="e-mail"
					/>

					<Input placeholder={account.dob} label="Birthdate" />

					<Input
						placeholder="password"
						secureTextEntry={true}
						label="Change Password"
					/>

					<Button title="Apply Changes" onPress={savePress} />
					<Button title="Log out" onPress={logout} />
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	list: {
		flex: 0.7,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
	avatar: {
		//flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		padding: 50,
	},
	text: {
		alignItems: "center",
	},
	textStyle: {
		//fontFamily: "San Francisco",
		fontSize: 30,
		//fontWeight: "bold"
	},

	title: {
		fontSize: 30,
		fontWeight: "800",
	},
	header: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "baseline",
		width: "100%",
		paddingTop: 60,
		paddingBottom: 20,
		paddingHorizontal: 30,
	},
});
