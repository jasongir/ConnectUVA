import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	SafeAreaView,
	Pressable,
	ScrollView,
} from "react-native";
import { pressedColor } from "../../misc/styleConstants";

import { getFirestore, collection } from "firebase/firestore";
import firebaseApp from "../../firebase/config";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

/* todo: when the user submits this information, we 
a. store these selections in the user's information (firestore collection for each user)
b. mark the user in the group under the list of users (firestore collection w/ only group information)
c. n/a?
*/
export default function InformationForm({ navigation }) {
	// keep track of the groups that user has selected
	const [selectedGroups, setSelectedGroups] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");

	// let users add max of 10 groups, returns a listener for the specific group
	const selectGroup = (selectedGroup) => () => {
		if (selectedGroups.length > 10) {
			setErrorMessage("Error: too many groups selected!");
			return;
		}

		// if we haven't selected the group, add the group
		if (!selectedGroups.some((someGroup) => someGroup.id === selectedGroup.id))
			setSelectedGroups([...selectedGroups, selectedGroup]);
		// otherwise, remove this group
		else
			setSelectedGroups(
				selectedGroups.filter((someGroup) => someGroup.id !== selectedGroup.id)
			);
		console.log();
	};
	// if we remove one of the selected groups, we may
	//  need to get rid of the error message
	useEffect(() => {
		if (errorMessage && selectedGroups.length <= 10) {
			setErrorMessage("");
		}
	}, [errorMessage, selectedGroups]);

	// check for authentication, go to onboarding if not authenticated
	const [user, loading, error] = useAuthState(getAuth(firebaseApp));
	useEffect(() => {
		if (!user) navigation.navigate("Onboarding");
	}, [user]);

	// load collection of groups
	const [collectionValues, collectionLoading, collectionError] = useCollection(
		collection(getFirestore(firebaseApp), "groups")
	);
	const nextPress = () => {
		navigation.push("MainApp");
	};
	const prevPress = () => {
		navigation.goBack();
	};
	return (
		<SafeAreaView style={styles.container}>
			<Text>Select up to 10 groups that interest you.</Text>
			<ScrollView>
				{loading && <Text>Loading user information...</Text>}
				{error && <Text>Error: {error.message}</Text>}

				{collectionLoading && <Text>Groups loading...</Text>}
				{collectionError && <Text>Error: {collectionError.message}</Text>}

				{!!errorMessage && <Text>{errorMessage}</Text>}

				{/*
               {collectionValues && <Text>{JSON.stringify(collectionValues)}</Text>}
             */}
				{collectionValues &&
					collectionValues.docs.map((group) => (
						<Pressable
							onPress={selectGroup(group)}
							key={group.id}
							style={({ pressed }) => [
								{
									backgroundColor: selectedGroups.some(
										(selectedGroup) => group.id === selectedGroup.id
									)
										? pressedColor
										: "white",
								},
							]}
						>
							<Text>{JSON.stringify(group.data())}, </Text>
						</Pressable>
					))}
				<StatusBar style="auto" />
			</ScrollView>
			<Text>{selectedGroups.length}/10 groups selected</Text>
			<Button title="next" onPress={nextPress} />
			<Button title="prev" onPress={prevPress} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
