import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { pressedColor } from "../../misc/styleConstants";

const GroupChoiceList = ({
	type,
	collectionValues,
	errorMessage,
	selectGroup,
	selectedGroups,
}) => {
	return (
		<View>
			{collectionValues ? (
				collectionValues.docs
					.filter((group) => group.data().type === type)
					.map((group) => (
						<Pressable
							onPress={selectGroup(group)}
							key={group.id}
							style={({ pressed }) => [
								{
									backgroundColor: selectedGroups.some(
										(selectedGroup) => group.id === selectedGroup.id
									)
										? pressedColor
										: "white",
								},
							]}
						>
							<Text>{group.data().name}</Text>
						</Pressable>
					))
			) : (
				<Text>{errorMessage}</Text>
			)}
		</View>
	);
};

export default GroupChoiceList;

const styles = StyleSheet.create({});
