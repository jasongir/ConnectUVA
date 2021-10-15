import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Alert, TouchableHighlight, Pressable, TouchableOpacity } from "react-native";
import { ListItem, Icon, Input, Button } from 'react-native-elements'
export default function GroupManagement({ navigation }) {

    const leaveGroup = () =>
        Alert.alert(
            "Leave Group",
            "Do you want to leave this group?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "Leave", onPress: () => Alert.alert("You have left this group"), style: "destructive" }
            ]
        );
    const addGroupPress = () => {
        navigation.push("GroupSearch");
    };
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Groups</Text>
            </View>

            <View style={styles.list}>

                <ListItem topDivider bottomDivider onPress={leaveGroup}>
                    <ListItem.Content>
                        <ListItem.Title>Group 1</ListItem.Title>
                    </ListItem.Content>
                </ListItem>


                <ListItem topDivider bottomDivider onPress={leaveGroup}>
                    <ListItem.Content>
                        <ListItem.Title>Group 2</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </View>


            <TouchableOpacity onPress={addGroupPress}>
                <View style={styles.addGroup}>
                    <Icon
                        name="add-circle-outline"
                        size={40}
                    />
                    </View>
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: "#fff",
    },
    list: {
        flex: .5,
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
    addGroup: {
        alignItems: "center",
        justifyContent: "center"
    }
});
