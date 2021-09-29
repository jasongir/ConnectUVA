import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Home Screen</Text>
			<Button
				title="go to details"
				onPress={() =>
					navigation.navigate("Details", {
						userName: "jason",
					})
				}
			/>
		</View>
	);
}

function DetailsScreen({ route, navigation }) {
	const { userName } = route.params;

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Details Screen</Text>
			<Text>{userName}</Text>
			<Button
				title="go to details, yet again"
				onPress={() =>
					navigation.push("Details", {
						userName: "Jason",
					})
				}
			/>
			<Button title="Go back" onPress={() => navigation.goBack()} />
			<Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
			<Button
				title="Go back to first screen in stack"
				onPress={() => navigation.popToTop()}
			/>
			<Button
				title="set params"
				onPress={() =>
					navigation.setParams({
						userName: userName.toLowerCase() === "jason" ? "NO" : "Jason",
					})
				}
			/>
		</View>
	);
}

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{
						title: "Home Screen :)",
						headerStyle: {
							backgroundColor: "#f4511e",
						},
						headerTitleStyle: {
							fontWeight: "bold",
						},
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Details"
					component={DetailsScreen}
					options={({ route, navigation }) => ({
						title: route.params.userName,
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
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
