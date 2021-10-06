import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import GroupListItem from "../../components/group-list-item/group-list-item.component";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const groups = Array(10)
	.fill()
	.map((_, idx) => ({
		name: `group ${idx}`,
		lastText: {
			text: `last message in ${idx}`,
			dateStamp: new Date().toLocaleDateString(),
			timeStamp: new Date().toLocaleTimeString(),
		},
		avatar: null,
		unreadMessageNumber: 1,
	}));

export default function Groups({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Groups</Text>
				<Ionicons name="search-outline" size={styles.title.fontSize} />
			</View>
			<ScrollView>
				{groups.map(({ name, lastText, avatar, unreadMessageNumber }) => (
					<GroupListItem
						key={name}
						name={name}
						lastText={lastText}
						avatar={avatar}
						unreadMessageNumber={unreadMessageNumber}
						onPress={() => navigation.push("MessagingScreen")}
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
		paddingTop: 60,
		paddingBottom: 20,
		paddingHorizontal: 30,
	},
	title: {
		fontSize: 30,
		fontWeight: "800",
	},
});
