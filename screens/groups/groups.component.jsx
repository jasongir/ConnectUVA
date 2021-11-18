import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import GroupListItem from "../../components/group-list-item/group-list-item.component";

import { headerTopPadding, pressedColor } from "../../misc/styleConstants";

import { SearchBar } from "react-native-elements";

import { getFirestore, collection } from "firebase/firestore";
import firebaseApp from "../../firebase/config.js";
import { useCollection } from "react-firebase-hooks/firestore";

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

	const updateSearchValue = (value) => {
		setSearchValue(value);
	};
	const updateSearching = () => {
		setSearching(!searching);
	};

	const [snapshot, loading, error] = useCollection(
		collection(getFirestore(firebaseApp), "groups")
	);

	return (
		<View style={styles.container}>
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
						onChangeText={updateSearchValue}
						value={searchValue}
					/>
				) : null}
			</View>
			<ScrollView style={{ width: "100%" }}>
				{snapshot &&
					snapshot.docs.map((doc) => (
						<Text key={doc.id}>{JSON.stringify(doc.data())}</Text>
					))}
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
