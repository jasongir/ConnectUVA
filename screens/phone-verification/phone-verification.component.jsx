import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Pressable } from "react-native";

export default function PhoneVerification({ navigation }) {
	const nextPress = () => {
		navigation.push("VerificationCode");
	};
	const prevPress = () => {
		navigation.goBack();
	};
	const [textInputValue, setTextInputValue] = React.useState('');
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Enter your phone number</Text>
			<Text style={styles.subtitle}>Please confirm your region and enter your phone number.</Text>

			<TextInput
      style={styles.phoneInput}
      onChangeText={text => setTextInputValue(text)}
			keyboardType={'phone-pad'}
      value={textInputValue}
	  	placeholder="123-456-7890"
    	/>
			<Pressable style={styles.roundButton1} onPress={nextPress}>
				<Text style={styles.buttonText}>Submit</Text>
			</Pressable>

			<Pressable style={styles.goBack} onPress={prevPress}>
				<Text style={styles.subtitle}>Go back</Text>
			</Pressable>

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
	title: {
		fontSize: 22,
		fontWeight: "800",
		top: "-21%",
	},
	subtitle: {
		fontSize: 18,
		fontWeight: "800",
		top: "-17%",
		opacity: 0.4,
		paddingHorizontal: 50,
		textAlign: "center",
	},
	phoneInput: {
		height: 50,
		width: "55%",
		top: "-10%",
		borderColor: 'gray',
		borderWidth: 1,
		textAlign: "center",
		borderRadius: 30,
		fontSize: 18
	},
	buttonText: {
		color: 'white',
		textAlign: "center",
		fontSize: 18
	},
	roundButton1: {
		backgroundColor: "black",
    padding: 18,
    borderRadius: 30,
		elevation: 5,
		width: "80%",
		height: 60,
		top: "0%"
  },
	goBack: {
		top: "35%",
		left: "-35%"
  },
});
