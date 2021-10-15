import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Onboarding from "./screens/onboarding/onboarding.component";
import PhoneVerification from "./screens/phone-verification/phone-verification.component";
import VerificationCode from "./screens/verification-code/verification-code.component";
import SetupName from "./screens/setup-name/setup-name.component";
import InfoForm from "./screens/information-form/information-form.component";
import myProfile from "./screens/my-profile/my-profile.component";
import MainApp from "./screens/main-app/main-app.component";

const Stack = createNativeStackNavigator();

export const mainFont = "Montserrat-Black";

export default function App() {
	let [fontsLoaded] = useFonts({
		Montserrat: require("./assets/fonts/Montserrat-Black.ttf"),
	});

	const globalOptions = {
		headerShown: false,
	};

	if (!fontsLoaded) return <AppLoading />;
	else
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName="MainApp">
					<Stack.Screen
						name="Onboarding"
						component={Onboarding}
						options={globalOptions}
					/>
					<Stack.Screen
						name="PhoneVerification"
						component={PhoneVerification}
						options={globalOptions}
					/>
					<Stack.Screen
						name="VerificationCode"
						component={VerificationCode}
						options={globalOptions}
					/>
					<Stack.Screen
						name="SetupName"
						component={SetupName}
						options={globalOptions}
					/>
					<Stack.Screen
						name="InfoForm"
						component={InfoForm}
						options={globalOptions}
					/>
					<Stack.Screen
						name="MainApp"
						component={MainApp}
						options={globalOptions}
					/>
					<Stack.Screen
						name="MyProfile"
						component={myProfile}
						options={globalOptions}
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
		fontFamily: "Montserrat-Black",
	},
});
