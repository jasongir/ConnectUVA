import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import GroupListItem from "../../components/group-list-item/group-list-item.component";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { headerTopPadding } from "../../misc/styleConstants";

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

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Groups</Text>
				<Ionicons name="search-outline" size={styles.title.fontSize} />
			</View>
			<ScrollView style={{ width: "100%" }}>
				{groups.map(({ name, lastText, avatar, unreadMessageNumber }) => (
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
	header: {
		display: "flex",
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
});
