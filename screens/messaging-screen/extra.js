if (keyboardShown) {
	// console.log("the keyboard is shown");
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
					<ScrollView style={{ width: "100%" }}>
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
} else {
	// console.log("keyboard not showing");
	return (
		<TouchableWithoutFeedback
			onPress={Keyboard.dismiss}
			style={styles.container}
		>
			<View style={styles.whiteContainer}>
				<MessageHeader groupName={groupName} navigation={navigation} />
				<ScrollView style={{ width: "100%" }}>
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
	);
}
return (
	<>
		{!keyboardShown ? (
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
			>
				<TouchableWithoutFeedback
					onPress={Keyboard.dismiss}
					style={styles.container}
				>
					<View style={styles.container}>
						<MessageHeader groupName={groupName} navigation={navigation} />
						<ScrollView style={{ width: "100%" }}>
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
		) : (
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}
				style={styles.container}
			>
				<View style={styles.container}>
					<MessageHeader groupName={groupName} navigation={navigation} />
					<ScrollView style={{ width: "100%" }}>
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
						/>
						<SendButton fontSize={20} callback={onSend} />
					</View>
					<StatusBar style="auto" />
				</View>
			</TouchableWithoutFeedback>
		)}
	</>
); ///
