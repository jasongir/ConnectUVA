import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Icon, Input, Button } from 'react-native-elements'
export default function GroupManagement({ navigation }) {

 
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Groups</Text>
            </View>
            <View style={styles.list}>
                <ListItem.Swipeable
                    topDivider
                    rightContent={
                        <Button
                            //title="Delete"
                            icon={{ name: 'delete', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                        />
                    }
                >
                    <ListItem.Content>
                        <ListItem.Title>Group 1</ListItem.Title>
                    </ListItem.Content>
                </ListItem.Swipeable>

                <ListItem.Swipeable
                
                    rightContent={
                        <Button
                            //title="Delete"
                            icon={{ name: 'delete', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                        />
                    }
                >
                    <ListItem.Content>
                        <ListItem.Title>Group 2</ListItem.Title>
                    </ListItem.Content>
                </ListItem.Swipeable>
            </View>

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
});
