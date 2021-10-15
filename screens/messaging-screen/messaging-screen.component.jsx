import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	ScrollView,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
	TextInput,
	Alert,
} from "react-native";

import SendButton from "../../components/send-button/send-button.component";
import Message from "../../components/message/message.component";
import MessageHeader from "../../components/message-header/message-header.component";

export default function MessagingScreen({ navigation, route }) {
	const { groupName } = route.params;

	// ref for the scrollview
	const scrollRef = useRef(null);

	const [inputVal, setInputVal] = useState("");
	const [messages, setMessages] = useState([]);
	const [keyboardShown, setKeyboardShown] = useState(false);

	// effects run at beginning of mount:
	useEffect(() => {
		// make our "api call" to our actual messages
		setMessages(lastMessages);
		// add listeners to our keyboard
		const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
			// console.log("keyboard showing");
			setKeyboardShown(true);
			// Alert.alert("YOU OPENED THE KEYBOARD");
		});

		const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
			// console.log("Keyboard hiddedn");
			setKeyboardShown(false);
			// Alert.alert("YOU CLOSED THE KEYBOARD");
		});

		// on initial render, scroll to end
		scrollRef.current.scrollToEnd({ animated: true, duration: 300 });

		// clean up the listeners we added
		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	useEffect(() => {
		scrollRef.current.scrollToEnd({ animated: true, duration: 300 });
	}, [messages]);

	const onInputChange = (text) => {
		setInputVal(text);
	};

	const onSend = () => {
		if (inputVal.length > 0) {
			setMessages([
				...messages,
				{
					id: Math.floor(Math.random() * 1000),
					content: inputVal,
					user: {
						id: currentUserId,
						firstName: "Jason",
						lastName: "Bourne",
					},
					timeStamp: new Date(),
				},
			]);

			setInputVal("");
			// console.log(messages.map((message) => message?.content));
		}
	};

	const currentUserId = "555";
	// dummy data at the end

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}
				style={styles.container}
			>
				<View style={styles.whiteContainer}>
					<MessageHeader groupName={groupName} navigation={navigation} />
					<ScrollView style={{ width: "100%" }} ref={scrollRef}>
						<View>
							{messages.map(({ id, content, user, timeStamp }) => (
								<Message
									key={id}
									content={content}
									user={user}
									timeStamp={timeStamp}
									currentUserId={currentUserId}
								/>
							))}
						</View>
					</ScrollView>
					<View style={styles.textInputContainer}>
						<TextInput
							onChangeText={onInputChange}
							value={inputVal}
							placeholder="Enter a message..."
							style={styles.textInput}
							multiline
							onSubmitEditing={Keyboard.dismiss}
						/>
						<SendButton fontSize={20} callback={onSend} />
					</View>
					<StatusBar style="auto" />
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
	},
	whiteContainer: {
		backgroundColor: "white",
		flex: 1,
		width: "100%",
	},
	chatContainer: {
		borderWidth: 1,
		borderColor: "black",
		borderStyle: "solid",
		width: "100%",
		// paddingTop: 300,
	},
	textInput: {
		fontSize: 20,
		padding: 10,
		flex: 20,
		// padding: 23,
		// margin: 10,
		// borderWidth: 1,
		// borderColor: "black",
		// borderStyle: "solid",
	},
	textInputContainer: {
		flexDirection: "row",
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
/*
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
*/
const lastMessages = [
	{
		id: "1231",
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum molestias commodi atque corporis error aliquam illo, sint dolores explicabo nobis, nulla ab mollitia sunt temporibus maiores quia iusto facilis eum at consequuntur. Voluptates tempore pariatur obcaecati, neque sed minus sint error aliquid sunt a nisi facilis expedita modi similique ut?",
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
