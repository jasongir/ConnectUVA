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
import { getFirestore, collection, doc, updateDoc } from "firebase/firestore";
import { useAuthState} from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

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

	const [newfname, setfName] = useState("");
	const [newlname, setlName] = useState("");
	const [newemail, setEmail] = useState("");
	
	const [value, lding, err] = useDocument(
		doc(getFirestore(firebaseApp), 'users', user.uid)
	);
	// console.log(newfname)
	// console.log(newlname)
	// console.log(newemail)
	const updateInfo = async() => {
		const userRef = doc(getFirestore(firebaseApp), 'users', user.uid)
		await updateDoc(userRef, {firstName: newfname, lastName: newlname, email: newemail})
		Alert.alert("Changes have been saved");
		navigation.pop();
	};

	
	const firstname = value && value.data().firstName
	const lastname = value && value.data().lastName
	const email = value && value.data().email
	const size = 150;
	const fullname = firstname + " " + lastname
	
	
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Account</Text>
			</View>
			<KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
				<ScrollView>
				<View style={styles.avatar}>
						<Avatar style={styles.avatar} name={fullname} size={size} />
					</View>
					<Input
						placeholder={firstname}
						autoCapitalize="words"
						label="First Name"
						onChangeText={(text) => setfName(text)}
					/>
					<Input
						placeholder={lastname}
						autoCapitalize="words"
						label="Last Name"
						onChangeText={(text) => setlName(text)}
					/>
					{/* <Input
						placeholder={email}
						textContentType="emailAddress"
						label="e-mail"
						onChangeText={(text) => setEmail(text)}
					/> */}
					<Button title="Apply Changes" onPress={updateInfo} />
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
