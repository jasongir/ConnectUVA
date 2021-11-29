import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, ScrollView, Linking } from "react-native";
//import { Avatar } from "react-native-elements";
import Avatar from "../../components/avatar/avatar.component";
import { firebaseApp } from "../../firebase/config"
import { getFirestore, collection, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

import { ListItem, Icon, Input } from 'react-native-elements'

import Ionicons from "@expo/vector-icons/Ionicons";

export default function Profile({ navigation }) {
	const [value, loading, error] = useDocument(
		doc(getFirestore(firebaseApp), 'users', 'XAgqJE0fjKekdeIphdedGCZZ4Go1')
	);
	const firstname = value && value.data().firstName
	const lastname = value && value.data().lastName
	const fullname = firstname + " " + lastname
	const groupPress = () => {
		navigation.push("GroupManagement");
	};

	const accountPress = () => {
		navigation.push("MyProfile");
	};
	const privacyPress = () => {
		navigation.push("PrivacyPolicy");
	};
	const notificationsPress = () => {
		Linking.openURL('app-settings://');
	};
	const size = 150;

	return (
		<View style={styles.container}>

			<View style={styles.header}>
				<Text style={styles.title}>Profile</Text>
			</View>

			<ScrollView>


				{/* <View style={styles.avatar}>
				<Avatar size="xlarge" rounded source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpgs' }} title="SG" />
			</View> */}

				<View style={styles.avatar}>
					<Avatar style={styles.avatar}  name={fullname} size={size}/>
				</View>

				<View style={styles.text}>
					<Text style={styles.textStyle}>{fullname}</Text>
				</View>


				<View style={styles.list}>
					<ListItem key="account" bottomDivider onPress={accountPress}>
						<Icon name="person-outline" type="ionicon" />
						<ListItem.Content>
							<ListItem.Title>Account</ListItem.Title>
						</ListItem.Content>
						<ListItem.Chevron />
					</ListItem>

					<ListItem key="groups" bottomDivider onPress={groupPress}>
						<Icon name="people-outline" type="ionicon" />
						<ListItem.Content>
							<ListItem.Title>Manage Groups</ListItem.Title>
						</ListItem.Content>
						<ListItem.Chevron />
					</ListItem>

					<ListItem key="notifications" bottomDivider onPress={notificationsPress}>
						<Icon name="notifications-outline" type="ionicon" />
						<ListItem.Content>
							<ListItem.Title>Notifications</ListItem.Title>
						</ListItem.Content>
						<ListItem.Chevron />
					</ListItem>

					<ListItem key="privacy" bottomDivider onPress={privacyPress}>
						<Icon name="lock-closed-outline" type="ionicon" />
						<ListItem.Content>
							<ListItem.Title>Privacy Policy</ListItem.Title>
						</ListItem.Content>
						<ListItem.Chevron />
					</ListItem>



				</View>

			</ScrollView>
		</View>

	);
}

const styles = StyleSheet.create({
	container: {

		flex: 1,
		backgroundColor: "#fff",
	},
	list: {
		flex: 0.7,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
	avatar: {
		//flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		padding: 50,
	},
	text: {
		alignItems: "center",
	},
	textStyle: {
		//fontFamily: "San Francisco",
		fontSize: 30,
		//fontWeight: "bold"
	},

	title: {
		fontSize: 30,
		fontWeight: "800",
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
});

