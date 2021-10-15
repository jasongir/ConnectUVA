import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import GroupsChatNavigator from "../groups-chat-navigator/groups-chat-navigator.component";
import Search from "../search/search.component";
import Profile from "../profile/profile.component";

const Tab = createBottomTabNavigator();
const globalOptions = {
	headerShown: false,
};

export default function MainApp() {
	return (
		<Tab.Navigator
			initialRouteName="GroupsChatNavigator"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === "GroupsChatNavigator") {
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
			<Tab.Screen
				name="GroupsChatNavigator"
				component={GroupsChatNavigator}
				options={({ route }) => ({
					...globalOptions,
					tabBarLabel: "Groups",
					title: "Groups",
					// hide tab bars when keyboard open, but only for Android
					tabBarHideOnKeyboard: Platform.OS === "android",
				})}
			/>
			<Tab.Screen name="Search" component={Search} options={globalOptions} />
			<Tab.Screen name="Profile" component={Profile} options={globalOptions} />
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
