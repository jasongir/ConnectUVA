import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { pressedColor } from "../../misc/styleConstants";

import { ListItem } from "react-native-elements";

const GroupChoiceList = ({
	type,
	collectionValues,
	errorMessage,
	selectGroup,
	selectedGroups,
}) => {
	return (
		<View style={styles.container}>
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
								styles.groupItem,
							]}
						>
							<ListItem
								bottomDivider
								containerStyle={{
									backgroundColor: selectedGroups.some(
										(selectedGroup) => group.id === selectedGroup.id
									)
										? pressedColor
										: "white",
								}}
							>
								<ListItem.Content>
									<ListItem.Title>{group.data().name}</ListItem.Title>
								</ListItem.Content>
							</ListItem>
						</Pressable>
					))
			) : (
				<Text>{errorMessage}</Text>
			)}
		</View>
	);
};

export default GroupChoiceList;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "column",
		// borderColor: "blue",
		// borderWidth: 2,
		// borderStyle: "solid",
	},
	groupItem: {
		width: "100%",
	},
});
