import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Pressable,
	SafeAreaView,
} from "react-native";
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

	const [userGroupsSnap, userGroupsLoading, userGroupsError] = useCollection(
		collection(getFirestore(firebaseApp), "groups")
	);
	const [allGroups, setAllGroups] = useState([]);
	useEffect(() => {
		(async () => {
			if (!userInfo) return;
			else if (userGroupsSnap?.docs?.length > 0) {
				const allGroups = [];
				userGroupsSnap.forEach((group) => {
					if (userInfo.groups.includes(group.id))
						allGroups.push({ ...group.data(), id: group.id });
				});
				setAllGroups(allGroups);
			}
		})();
	}, [userInfo, userGroupsSnap]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContainer}>
				<View style={styles.header}>
					<Text style={styles.title}>Groups</Text>
					<Pressable
						onPress={updateSearching}
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
						onChangeText={setSearchValue}
						value={searchValue}
					/>
				) : null}
			</View>
			<ScrollView style={{ width: "100%" }}>
				{userGroupsError && <Text>Error: {userGroupsError.message}</Text>}
				{userGroupsLoading && <Text>Loading your groups...</Text>}
				{allGroups && allGroups.length > 0 ? (
					allGroups
						.filter((group) =>
							group.name.toLowerCase().includes(searchValue.toLowerCase())
						)
						.map(({ id, name, lastMessage, timestamp }) => (
							<GroupListItem
								key={id}
								name={name}
								lastText={{ text: lastMessage, timeStamp: timestamp }}
								avatar={null}
								unreadMessageNumber={0}
								navigation={navigation}
								groupId={id}
							/>
						))
				) : (
					<Text>there are no groups to display :(</Text>
				)}
			</ScrollView>
			<StatusBar style="auto" />
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

/*
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
*/
