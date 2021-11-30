import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, TouchableHighlight, Pressable, TouchableOpacity, Button } from "react-native";
import { ListItem, Icon, Input } from 'react-native-elements'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserContext } from "../../App";
import firebaseApp from "../../firebase/config.js";
import {
    getFirestore,
    collection,
    query,
    where,
    doc,
    getDoc,
    getDocs,
    setDoc
} from "firebase/firestore";
import {
    useCollection,
    useCollectionData,
    useDocumentData,
} from "react-firebase-hooks/firestore";

export default function GroupManagement({ navigation }) {
    const [snapshot, loading, error] = useCollection(
        collection(getFirestore(firebaseApp), "groups")
    );

    const [user, lding, er] = useAuthState(getAuth(firebaseApp));
    useEffect(() => {
        if (!user) navigation.navigate("Onboarding");
    }, [user]);

    const [value, load, err] = useDocumentData(
        doc(getFirestore(firebaseApp), 'users', user.uid)
    );

    function onMultiChange() {
        return (item) => setSelectedGroups(xorBy(selectedGroups, [item], 'id'))
    }
    const [userGroups, setUserGroups] = useState([]);
    useEffect(() => {
        (async () => {
            if (!value) return;
            else if (snapshot?.docs?.length > 0) {
                const selectedGroups = [];
                snapshot.forEach((group) => {
                    if (value.groups.includes(group.id))
                        selectedGroups.push({ ...group.data(), id: group.id });
                });
                setSelectedGroups(selectedGroups);
            }
        })();
    }, [value, snapshot]);

    // const userDisplayGroups = userGroups.map(group => {
    //     const container = {};

    //     container.id = group.id
    //     container.item = group.name;

    //     return container;
    // })
    // const ug = value && value.data().groups
    // console.log(userGroups)

    const nextPress = async () => {

        const firestore = getFirestore(firebaseApp);
        const userRef = await setDoc(
            doc(firestore, "users", user.uid),
            {
                groups: selectedGroups.map((group) => group.id),
            },
            { merge: true }
        );
        
        
        selectedGroups.forEach(async (group) => {
            if (!group.members.includes(user.uid)){
            const groupRef = await setDoc(
                doc(firestore, "groups", group.id),
                {
                    members: [...group.members, user.uid],
                },
                { merge: true }
            );
            }
        });
        // setUserInfo({
        //     ...userInfo,
        //     groups: selectedGroups.map((group) => group.id),
        // });
        
        Alert.alert("Changes Applied!")
        navigation.pop();
    };

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
            <Text style={{ fontSize: 20, padding: 10 }}>Choose Groups</Text>
            <View style={{padding: 10}}>
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
                multiOptionContainerStyle={{backgroundColor: "black"}} 
                
                
            />
            </View>
            <Button style={{alignItems: "baseline"}} title="Apply Changes" onPress={nextPress} />
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
