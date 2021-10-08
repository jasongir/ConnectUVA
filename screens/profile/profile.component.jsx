import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Avatar } from "react-native-elements";

import { ListItem, Icon } from "react-native-elements";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Profile({ navigation }) {
	const groupPress = () => {
		navigation.push("MainApp");
	};

	const accountPress = () => {
		navigation.push("InfoForm");
	};
	return (
		<View style={styles.container}>
			<View style={styles.avatar}>
				<Avatar
					size="xlarge"
					rounded
					source={{
						uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpgs",
					}}
					title="SG"
				/>
			</View>

			<View style={styles.text}>
				<Text style={styles.textStyle}>Sam Galletta</Text>
			</View>

			<View style={styles.list}>
				<ListItem key="account" bottomDivider onPress={accountPress}>
					<Icon name="person-outline" type="ionicon" />
					<ListItem.Content>
						<ListItem.Title>Account</ListItem.Title>
					</ListItem.Content>
					<ListItem.Chevron />
				</ListItem>

				<ListItem key="groups" bottomDivider onPress={groupPress}>
					<Icon name="people-outline" type="ionicon" />
					<ListItem.Content>
						<ListItem.Title>Manage Groups</ListItem.Title>
					</ListItem.Content>
					<ListItem.Chevron />
				</ListItem>

				<ListItem key="notifications" bottomDivider>
					<Icon name="notifications-outline" type="ionicon" />
					<ListItem.Content>
						<ListItem.Title>Notifications</ListItem.Title>
					</ListItem.Content>
					<ListItem.Chevron />
				</ListItem>

				<ListItem key="privacy" bottomDivider>
					<Icon name="lock-closed-outline" type="ionicon" />
					<ListItem.Content>
						<ListItem.Title>Privacy</ListItem.Title>
					</ListItem.Content>
					<ListItem.Chevron />
				</ListItem>
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
		flex: 0.7,
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
});

// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity
// } from 'react-native';

// export default class Profile extends Component {

//   render() {
//     return (
//       <View style={styles.container}>
//           <View style={styles.header}></View>
//           <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
//           <View style={styles.body}>
//             <View style={styles.bodyContent}>
//               <Text style={styles.name}>John Doe</Text>
//               <Text style={styles.info}>UX Designer / Mobile developer</Text>
//               <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>

//               <TouchableOpacity style={styles.buttonContainer}>
//                 <Text>Opcion 1</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.buttonContainer}>
//                 <Text>Opcion 2</Text>
//               </TouchableOpacity>
//             </View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   header:{
//     backgroundColor: "#fff",
//     height:200,
//   },
//   avatar: {
//     width: 130,
//     height: 130,
//     borderRadius: 63,
//     borderWidth: 4,
//     borderColor: "white",
//     marginBottom:10,
//     alignSelf:'center',
//     position: 'absolute',
//     marginTop:130
//   },
//   name:{
//     fontSize:22,
//     color:"#FFFFFF",
//     fontWeight:'600',
//   },
//   body:{
//     marginTop:40,
//   },
//   bodyContent: {
//     flex: 1,
//     alignItems: 'center',
//     padding:30,
//   },
//   name:{
//     fontSize:28,
//     color: "#696969",
//     fontWeight: "600"
//   },
//   info:{
//     fontSize:16,
//     color: "#00BFFF",
//     marginTop:10
//   },
//   description:{
//     fontSize:16,
//     color: "#696969",
//     marginTop:10,
//     textAlign: 'center'
//   },
//   buttonContainer: {
//     marginTop:10,
//     height:45,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom:20,
//     width:250,
//     borderRadius:30,
//     backgroundColor: "#000000",
//   },
// });
