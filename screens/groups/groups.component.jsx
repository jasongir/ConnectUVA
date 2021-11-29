import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import GroupListItem from "../../components/group-list-item/group-list-item.component";

import { headerTopPadding, pressedColor } from "../../misc/styleConstants";

import { SearchBar } from "react-native-elements";

import firebaseApp from "../../firebase/config.js";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { UserContext } from "../../App";

import {
	getFirestore,
	collection,
	query,
	where,
	doc,
	getDoc,
	getDocs,
} from "firebase/firestore";
import {
	useCollection,
	useCollectionData,
	useDocumentData,
} from "react-firebase-hooks/firestore";

const groups = Array(10)
	.fill()
	.map((_, idx) => ({
		name: `group ${idx}`,
		lastText: {
			text: `last message in ${idx}`,
			timeStamp: new Date(),
		},
		avatar: null,
		unreadMessageNumber: Math.floor(Math.random() * 7),
	}));

export default function Groups({ navigation }) {
	const [searching, setSearching] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const updateSearching = () => {
		setSearching(!searching);
	};

	// get the actual authentication data
	const [user, loading, error] = useAuthState(getAuth(firebaseApp));
	useEffect(() => {
		if (!user) navigation.navigate("Onboarding");
	}, [user]);

	// deal with getting the user-related data
	const [userInfo, setUserInfo] = useContext(UserContext);
	const [userInfoValue, userInfoLoading, userInfoError] = useDocumentData(
		doc(getFirestore(firebaseApp), "users", user.uid)
	);

	useEffect(() => {
		if (userInfoLoading) return;
		setUserInfo(userInfoValue);
	}, [userInfoValue, userInfoLoading]);

	const [groupsQuery, setGroupsQuery] = useState(null);
	useEffect(() => {
		(async () => {
			if (!userInfo) return;
			else {
				const groupsRef = collection(getFirestore(firebaseApp), "groups");
				// const allGroups = await getDocs(
				// 	collection(getFirestore(firebaseApp), "groups")
				// );
				// allGroups.forEach((doc) => console.log(doc.id));
				// console.log(userInfo.groups);
				const newGroupsQuery = query(groupsRef, where("type", "==", "course"));
				const theGroups = await getDocs(newGroupsQuery);
				theGroups.docs.forEach((group) => console.log(group.data()));
				// console.log(theGroups.docs);
				setGroupsQuery(newGroupsQuery);
			}
		})();
	}, [userInfo]);
	const [userGroupsSnap, userGroupsLoading, userGroupsError] =
		useCollection(groupsQuery);

	// useEffect(() => {
	// 	console.log("usergroupsnap: " + userGroupsSnap?.docs);
	// 	// console.log("groupsQuery: " + groupsQuery);
	// 	// console.log("userInfo: " + userInfo);
	// });

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<View style={styles.header}>
					<Text style={styles.title}>Groups</Text>
					<Pressable
						onPress={setSearchValue}
						style={({ pressed }) => [
							{
								backgroundColor: pressed ? pressedColor : "white",
							},
							styles.searchBtn,
						]}
					>
						{searching ? (
							<>
								<Ionicons name={"close"} size={styles.title.fontSize} />
								<Text>close</Text>
							</>
						) : (
							<>
								<Ionicons
									name={"search-outline"}
									size={styles.title.fontSize}
								/>
							</>
						)}
					</Pressable>
				</View>
				{searching ? (
					<SearchBar
						lightTheme
						placeholder="search for a group..."
						onChangeText={updateSearchValue}
						value={searchValue}
					/>
				) : null}
			</View>
			<ScrollView style={{ width: "100%" }}>
				{/* snapshot &&
					snapshot.docs.map((doc) => (
						<Text key={doc.id}>{JSON.stringify(doc.data())}</Text>
               )) */}
				{userGroupsError && <Text>Error: {userGroupsError.message}</Text>}
				{userGroupsLoading && <Text>Loading your groups...</Text>}
				{userGroupsSnap && userGroupsSnap.length > 0 ? (
					userGroupsSnap.docs.map((group) => (
						<Text key={group.id}>{JSON.stringify(group.data())}</Text>
					))
				) : (
					<Text>there are no groups to display >:(</Text>
				)}
				{groups
					.filter((group) => {
						return group.name.includes(searchValue.toLowerCase());
					})
					.map(({ name, lastText, avatar, unreadMessageNumber }) => (
						<GroupListItem
							key={name}
							name={name}
							lastText={lastText}
							avatar={avatar}
							unreadMessageNumber={unreadMessageNumber}
							navigation={navigation}
						/>
					))}
			</ScrollView>
			<StatusBar style="auto" />
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
	headerContainer: {
		width: "100%",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "baseline",
		width: "100%",
		paddingTop: headerTopPadding,
		paddingBottom: 20,
		paddingHorizontal: 30,
	},
	title: {
		fontSize: 30,
		fontWeight: "700",
	},
	searchBtn: {
		padding: 7,
		borderRadius: 99,
	},
});
