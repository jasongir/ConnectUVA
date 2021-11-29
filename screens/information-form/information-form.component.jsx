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

import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import firebaseApp from "../../firebase/config";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import GroupChoiceList from "../../components/group-choice-list/group-choice-list.component";

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
		// if we haven't selected the group, add the group
		if (
			!selectedGroups.some((someGroup) => someGroup.id === selectedGroup.id)
		) {
			if (selectedGroups.length >= 10) {
				setErrorMessage("Error: too many groups selected!");
				return;
			}
			setSelectedGroups([...selectedGroups, selectedGroup]);
		}
		// otherwise, remove this group
		else
			setSelectedGroups(
				selectedGroups.filter((someGroup) => someGroup.id !== selectedGroup.id)
			);
		// console.log();
	};
	// if we remove one of the selected groups, we may
	//  need to get rid of the error message
	useEffect(() => {
		if (errorMessage && selectedGroups.length <= 10) {
			setErrorMessage("");
		}
	}, [selectedGroups]);

	// check for authentication, go to onboarding if not authenticated
	const [user, loading, error] = useAuthState(getAuth(firebaseApp));
	useEffect(() => {
		if (!user) navigation.navigate("Onboarding");
	}, [user]);

	// load collection of groups
	const [collectionValues, collectionLoading, collectionError] = useCollection(
		collection(getFirestore(firebaseApp), "groups")
	);

	// save the user's data; add them to the selected groups
	const nextPress = async () => {
		if (selectedGroups.length === 0) {
			setErrorMessage("Must select at least one group to continue.");
			return;
		}
		try {
			const firestore = getFirestore(firebaseApp);
			const userRef = await setDoc(
				doc(firestore, "users", user.uid),
				{
					groups: selectedGroups.map((group) => group.id),
				},
				{ merge: true }
			);

			selectedGroups.forEach(async (group) => {
				const groupRef = await setDoc(
					doc(firestore, "groups", group.id),
					{
						members: [...group.data().members, user.uid],
					},
					{ merge: true }
				);
			});

			navigation.push("MainApp");
		} catch (err) {
			setErrorMessage(String(err));
			console.log(err);
		}
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

				<Text>Courses:</Text>
				<GroupChoiceList
					type="course"
					collectionValues={collectionValues}
					errorMessage={"No courses to display..."}
					selectGroup={selectGroup}
					selectedGroups={selectedGroups}
				/>
				<Text>Interests:</Text>
				<GroupChoiceList
					type="interest"
					collectionValues={collectionValues}
					errorMessage={"No interests to display..."}
					selectGroup={selectGroup}
					selectedGroups={selectedGroups}
				/>
				<Text>Majors:</Text>
				<GroupChoiceList
					type={"major"}
					collectionValues={collectionValues}
					errorMessage={"No majors to display..."}
					selectGroup={selectGroup}
					selectedGroups={selectedGroups}
				/>
				<Text>Class Years:</Text>
				<GroupChoiceList
					type={"classYear"}
					collectionValues={collectionValues}
					errorMessage={"No class years to display..."}
					selectGroup={selectGroup}
					selectedGroups={selectedGroups}
				/>
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
