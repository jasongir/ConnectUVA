import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Groups from "../groups/groups.component";
import Search from "../search/search.component";
import Profile from "../profile/profile.component";

const Tab = createBottomTabNavigator();

export default function MainApp() {
	return (
		<Tab.Navigator
			initialRouteName="Groups"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === "Groups") {
						iconName = "people-outline";
					} else if (route.name === "Search") {
						iconName = "search-outline";
					} else if (route.name === "Profile") {
						iconName = "person-circle-outline";
					}
					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
		>
			<Tab.Screen name="Groups" component={Groups} />
			<Tab.Screen name="Search" component={Search} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
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
