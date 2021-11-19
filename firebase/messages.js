import { getDatabase, ref, set, push, onValue } from "firebase/database";

const db = getDatabase();

const sendMessage = (user, group, message) => {
	const groupChat = ref(db, `messages/${group}`);
	const newMessage = push(groupChat);
	set(newMessage, {
		name: user,
		message: message,
		timeStamp: Date.now(),
	});
};

const getMessages = (user, group, setter) => {
	const groupChat = ref(db, `messages/${group}`);
};

const messageAdded = (user, group) => {};

const dbRef = ref(db, "/a/b/c");
onValue(
	dbRef,
	(snapshot) => {
		snapshot.forEach((childSnapshot) => {
			const childKey = childSnapshot.key;
			const childData = childSnapshot.val();
			// ...
		});
	},
	{
		onlyOnce: true,
	}
);
