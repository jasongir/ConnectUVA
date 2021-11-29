import { StatusBar } from "expo-status-bar";
import React, {
	useCallback,
	useState,
	useEffect,
	useRef,
	useContext,
} from "react";
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
	Pressable,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import SendButton from "../../components/send-button/send-button.component";
import Message from "../../components/message/message.component";
import MessageHeader from "../../components/message-header/message-header.component";

import firebaseApp from "../../firebase/config";
import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserContext } from "../../App";

import {
	getFirestore,
	collection,
	doc,
	addDoc,
	updateDoc,
	arrayUnion,
	Timestamp,
} from "firebase/firestore";
import {
	useCollection,
	useCollectionData,
	useDocumentData,
} from "react-firebase-hooks/firestore";

export default function MessagingScreen({ navigation, route }) {
	const { groupName, groupId } = route.params;

	// ref for the scrollview
	const scrollRef = useRef(null);

	const [inputVal, setInputVal] = useState("");
	const [keyboardShown, setKeyboardShown] = useState(false);

	// effects run at beginning of mount:
	useEffect(() => {
		// add listeners to our keyboard
		const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
			setKeyboardShown(true);
		});

		const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardShown(false);
		});

		// on initial render, scroll to end
		// clean up the listeners we added
		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	useFocusEffect(() => {
		scrollRef.current.scrollToEnd({ animated: true, duration: 300 });
	});

	// get authentication data
	const [user, loading, error] = useAuthState(getAuth(firebaseApp));
	useEffect(() => {
		if (!user) navigation.navigate("Onboarding");
	}, [user]);

	// get user's actual data:
	const [userInfo, setUserInfo] = useContext(UserContext);
	const [userInfoValue, userInfoLoading, userInfoError] = useDocumentData(
		doc(getFirestore(firebaseApp), "users", user.uid)
	);
	useEffect(() => {
		if (userInfoLoading) return;
		setUserInfo(userInfoValue);
	}, [userInfoValue, userInfoLoading]);

	const [messagesSnap, messagesLoading, messagesError] = useCollection(
		collection(getFirestore(firebaseApp), "messages", groupId, "messages")
	);
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		(async () => {
			if (!userInfo) return;
			else if (messagesSnap?.docs?.length > 0) {
				const allMessages = [];
				messagesSnap.forEach((message) => {
					// console.log(message.data());
					allMessages.push({
						...message.data(),
						id: message.id,
						timeStamp: message.data().timestamp.toDate(),
					});
				});
				setMessages(allMessages);
			}
		})();
	}, [userInfo, messagesSnap]);

	const onSend = async () => {
		try {
			if (inputVal.length > 0) {
				await addDoc(
					collection(
						getFirestore(firebaseApp),
						"messages",
						groupId,
						"messages"
					),
					{
						content: inputVal,
						timestamp: Timestamp.fromDate(new Date()),
						// userFirstName: userInfo.firstName,
						// userLastName: userInfo.lastName,
						user: userInfo,
					}
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	// useEffect(() => {
	// 	console.log(messages);
	// });

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<View style={styles.whiteContainer}>
				<MessageHeader groupName={groupName} navigation={navigation} />
				<ScrollView
					style={{ width: "100%" }}
					ref={scrollRef}
					onContentSizeChange={() => scrollRef.current.scrollToEnd()}
				>
					<Pressable onPress={Keyboard.dismiss}>
						{messages.map((message) => {
							<Text key={message.id}>{JSON.stringify(message)}</Text>;
						})}
						{messages &&
							user &&
							messages.map(({ id, content, user, timeStamp }) => (
								<Message
									key={id}
									content={content}
									user={user}
									timeStamp={timeStamp}
									currentUserId={userInfo.id}
								/>
							))}
					</Pressable>
				</ScrollView>
				<View style={styles.textInputContainer}>
					<TextInput
						onChangeText={setInputVal}
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
/*
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
/*
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
*/
