import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Onboarding from "./screens/onboarding/onboarding.component";
import PhoneVerification from "./screens/phone-verification/phone-verification.component";
import VerificationCode from "./screens/verification-code/verification-code.component";
import SetupName from "./screens/setup-name/setup-name.component";
import InfoForm from "./screens/information-form/information-form.component";

import MainApp from "./screens/main-app/main-app.component";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Onboarding">
				<Stack.Screen
					name="Onboarding"
					component={Onboarding}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="PhoneVerification"
					component={PhoneVerification}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="VerificationCode"
					component={VerificationCode}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="SetupName"
					component={SetupName}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="InfoForm"
					component={InfoForm}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="MainApp"
					component={MainApp}
					options={{
						headerShown: false,
					}}
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
