import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import Message from "../../components/message/message.component";
import MessageHeader from "../../components/message-header/message-header.component";

export default function MessagingScreen({ navigation, route }) {
	const { groupName } = route.params;

	const [messages, setMessages] = useState([]);
	useEffect(() => {
		setMessages(lastMessages);
	}, []);

	const currentUserId = "555";
	// dummy data at the end
	// return (
	// 	<View style={styles.container}>
	// 		<MessageHeader groupName={groupName} navigation={navigation} />
	// 		<ScrollView style={{ width: "100%" }}>
	// 			{lastMessages.map(({ id, content, user, timeStamp }) => (
	// 				<Message
	// 					key={id}
	// 					content={content}
	// 					user={user}
	// 					timeStamp={timeStamp}
	// 					currentUserId={currentUserId}
	// 				/>
	// 			))}
	// 		</ScrollView>
	// 		<StatusBar style="auto" />
	// 	</View>
	// );

	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
	}, []);
	return (
		<GiftedChat
			messages={messages}
			renderAvater={null}
			onSend={(messages) => onSend(messages)}
			user={jasonBourne}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		// alignItems: "center",
		// justifyContent: "flex-start",
	},
	chatContainer: {
		borderWidth: 1,
		borderColor: "black",
		borderStyle: "solid",
		width: "100%",
		// paddingTop: 300,
	},
});

const createDate = (hour, minute) =>
	new Date(`October 15, 2021 ${hour}:${minute} PM`);

const [
	johnSmith,
	anthonyCharlottesburg,
	juneJohnson,
	johnLee,
	jasonBourne,
	jasmineWashington,
] = [
	{
		_id: "111",
		name: "John Smith",
		firstName: "John",
		lastName: "Smith",
	},
	{
		_id: "222",
		name: "Anthony Charlottesburg",
		firstName: "Anthony",
		lastName: "Charlottesburg",
	},
	{
		_id: "333",
		name: "June Johnson",
		firstName: "June",
		lastName: "Johnson",
	},
	{
		_id: "444",
		name: "John Lee",
		firstName: "John",
		lastName: "Lee",
	},
	{
		_id: "555",
		name: "Jason Bourne",
		firstName: "Jason",
		lastName: "Bourne",
	},
	{
		_id: "666",
		name: "Jasmine Washington",
		firstName: "Jasmine",
		lastName: "Washington",
	},
];

const lastMessages = [
	{
		_id: "1231",
		text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, facilis?",
		user: johnSmith,
		createdAt: createDate(1, 45),
	},
	{
		_id: "1232",
		text: "Hi guys! When's HW2 due?",
		user: anthonyCharlottesburg,
		timeStamp: createDate(3, 27),
	},
	{
		_id: "1233",
		text: "September 13th",
		user: juneJohnson,
		timeStamp: createDate(4, 11),
	},
	{
		_id: "1234",
		text: "What did you use?",
		user: johnLee,
		timeStamp: createDate(4, 12),
	},
	{
		_id: "1235",
		text: "I used python, but it's slower",
		user: jasonBourne,
		timeStamp: createDate(4, 13),
	},
	{
		_id: "1236",
		text: "Okay that makes sense, I've just been using C++",
		user: jasmineWashington,
		timeStamp: createDate(5, 31),
	},
	{
		_id: "1237",
		text: "Has anyone been able to do a master theorem proof?",
		user: jasonBourne,
		timeStamp: createDate(5, 35),
	},
	{
		_id: "1238",
		text: "It's impossible.",
		user: johnLee,
		timeStamp: createDate(5, 32),
	},
];
// const lastMessages = [
// 	{
// 		id: "1231",
// 		content:
// 			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, facilis?",
// 		user: {
// 			id: "111",
// 			firstName: "John",
// 			lastName: "Smith",
// 		},
// 		timeStamp: createDate(1, 45),
// 	},
// 	{
// 		id: "1232",
// 		content: "Hi guys! When's HW2 due?",
// 		user: {
// 			id: "222",
// 			firstName: "Anthony",
// 			lastName: "Charlottesburg",
// 		},
// 		timeStamp: createDate(3, 27),
// 	},
// 	{
// 		id: "1233",
// 		content: "September 13th",
// 		user: {
// 			id: "333",
// 			firstName: "June",
// 			lastName: "Johnson",
// 		},
// 		timeStamp: createDate(4, 11),
// 	},
// 	{
// 		id: "1234",
// 		content: "What did you use?",
// 		user: {
// 			id: "444",
// 			firstName: "John",
// 			lastName: "Lee",
// 		},
// 		timeStamp: createDate(4, 12),
// 	},
// 	{
// 		id: "1235",
// 		content: "I used python, but it's slower",
// 		user: {
// 			id: "555",
// 			firstName: "Jason",
// 			lastName: "Bourne",
// 		},
// 		timeStamp: createDate(4, 13),
// 	},
// 	{
// 		id: "1236",
// 		content: "Okay that makes sense, I've just been using C++",
// 		user: {
// 			id: "666",
// 			firstName: "Jasmine",
// 			lastName: "Washington",
// 		},
// 		timeStamp: createDate(5, 31),
// 	},
// 	{
// 		id: "1237",
// 		content: "Has anyone been able to do a master theorem proof?",
// 		user: {
// 			id: "555",
// 			firstName: "Jason",
// 			lastName: "Bourne",
// 		},
// 		timeStamp: createDate(5, 35),
// 	},
// 	{
// 		id: "1238",
// 		content: "It's impossible.",
// 		user: {
// 			id: "444",
// 			firstName: "John",
// 			lastName: "Lee",
// 		},
// 		timeStamp: createDate(5, 32),
// 	},
// ];
