import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

import AppLoading from "expo-app-loading";

import Groups from "../groups/groups.component";
import MessagingScreen from "../messaging-screen/messaging-screen.component";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const globalOptions = {
	headerShown: false,
};

export default function App() {
	return (
		<Stack.Navigator initialRouteName="Groups">
			<Stack.Screen name="Groups" component={Groups} options={globalOptions} />
			<Stack.Screen
				name="MessagingScreen"
				component={MessagingScreen}
				options={globalOptions}
			/>
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		fontFamily: "Montserrat-Black",
	},
});
