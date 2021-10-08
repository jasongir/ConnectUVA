import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

import Message from "../../components/message/message.component";
import MessageHeader from "../../components/message-header/message-header.component";

export default function MessagingScreen({ navigation, route }) {
	const { groupName } = route.params;

	const currentUser = "555";
	// dummy data at the end
	return (
		<View style={styles.container}>
			<MessageHeader groupName={groupName} navigation={navigation} />
			<ScrollView style={{ width: "100%" }}>
				{lastMessages.map(({ id, content, user, timeStamp, currentUser }) => (
					<Message
						key={id}
						content={content}
						user={user}
						timeStamp={timeStamp}
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
		justifyContent: "flex-start",
	},
});

const createDate = (hour, minute) =>
	new Date(`October 15, 2021 ${hour}:${minute} PM`);

const lastMessages = [
	{
		id: "1231",
		content:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, facilis?",
		user: {
			id: "111",
			firstName: "John",
			lastName: "Smith",
		},
		timeStamp: createDate(1, 45),
	},
	{
		id: "1232",
		content: "Hi guys! When's HW2 due?",
		user: {
			id: "222",
			firstName: "Anthony",
			lastName: "Charlottesburg",
		},
		timeStamp: createDate(3, 27),
	},
	{
		id: "1233",
		content: "September 13th",
		user: {
			id: "333",
			firstName: "June",
			lastName: "Johnson",
		},
		timeStamp: createDate(4, 11),
	},
	{
		id: "1234",
		content: "What did you use?",
		user: {
			id: "444",
			firstName: "John",
			lastName: "Lee",
		},
		timeStamp: createDate(4, 12),
	},
	{
		id: "1235",
		content: "I used python, but it's slower",
		user: {
			id: "555",
			firstName: "Jason",
			lastName: "Bourne",
		},
		timeStamp: createDate(4, 13),
	},
	{
		id: "1236",
		content: "Okay that makes sense, I've just been using C++",
		user: {
			id: "666",
			firstName: "Jasmine",
			lastName: "Washington",
		},
		timeStamp: createDate(5, 31),
	},
	{
		id: "1237",
		content: "Has anyone been able to do a master theorem proof?",
		user: {
			id: "555",
			firstName: "Jason",
			lastName: "Bourne",
		},
		timeStamp: createDate(5, 35),
	},
	{
		id: "1238",
		content: "It's impossible.",
		user: {
			id: "444",
			firstName: "John",
			lastName: "Lee",
		},
		timeStamp: createDate(5, 32),
	},
];
