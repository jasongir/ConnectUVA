import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, TouchableHighlight, Pressable, TouchableOpacity } from "react-native";
import { ListItem, Icon, Input, Button } from 'react-native-elements'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { getFirestore, collection, doc, updateDoc } from "firebase/firestore";
import firebaseApp from "../../firebase/config.js";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

export default function GroupManagement({ navigation }) {
    const [snapshot, loading, error] = useCollection(
		collection(getFirestore(firebaseApp), "groups")
    );
    
    const [value, load, err] = useDocument(
		doc(getFirestore(firebaseApp), 'users', 'XAgqJE0fjKekdeIphdedGCZZ4Go1')
    );
    
    
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

    function onMultiChange() {
        return (item) => setSelectedGroups(xorBy(selectedGroups, [item], 'id'))
    }

    
    const userGroups = value && value.data().groups
    console.log(userGroups)
        
    const allgroups = snapshot && snapshot.docs.map(doc => {
        const container = {};
        
        container.id = doc.id;
        container.item = doc.data().name;
        
    
        return container;
    })
    
    
    const [selectedGroups, setSelectedGroups] = useState([])
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Groups</Text>
            </View>
            
            <View style={{ height: 100 }} />
            <Text style={{ fontSize: 20, paddingBottom: 10 }}>Choose Groups</Text>
            <SelectBox
                label="Select multiple"
                options={allgroups}
                selectedValues={selectedGroups}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                arrowIconColor="black"
                searchIconColor="black"
                toggleIconColor="black"
                isMulti
            />
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
