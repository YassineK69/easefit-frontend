import { ImageBackground, Image, StyleSheet, Text, View, TextInput } from "react-native";
import { useEffect, useState } from 'react';

export default function Profile({ navigation }) {

  const [user, setUser] = useState([]);

  useEffect(() => {
     fetch('http://localhost:3000/users/user/:token')
     .then(response => response.json())
     .then(data => {
       setUser(data);
     });
 }, []);

  return (
    <ImageBackground
      source={require("../assets/fond3.jpg")}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../assets/avatar.jpg")}
            style={{ width: 120, height: 120 }}
          />
          <Text style={styles.text}>UserName</Text>
        </View>

      {/* <View style={styles.ligne}>
        <View style={styles.line}>
          ''
        </View>
    </View> */}

        <View style={styles.body}>
          <View style={styles.left}>
          <Text style={styles.text}>Name</Text>
          <Text style={styles.text}>Birth</Text>
          <Text style={styles.text}>Type</Text>
          <Text style={styles.text}>height</Text>
          <Text style={styles.text}>activity</Text>
        </View>
      
        <View style={styles.right}>
          <TextInput>{user.firstName}</TextInput>
          <TextInput>{user.birthday}</TextInput>
          <TextInput>{user.gender}</TextInput>
          <TextInput>{user.height}</TextInput>
          <TextInput>{user.idActivities}</TextInput>
      </View>
   </View>
      {/* <View style={styles.ligne}>
        <View style={styles.line}>
          ''
        </View>
    </View> */}
</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  imageBackground: {
    height: "100%",
    width: "100%",
  },

  container: {
    flex: 1,
    width: '100%',
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 20,
  },

  body: {
    flexDirection: "row",
    alignItems:'center',
    justifyContent:'center',
  },

  left: {
   paddingTop: 10,
   paddingBottom: 10,
   paddingRight: 20,
  }, 

  right: {
   paddingTop: 10,
   paddingBottom: 10,
   paddingLeft: 20,
  },

  ligne: {
    paddingBottom:15,
    paddingTop: 20,
  },

  line:{
    borderWidth:2,
    borderColor: "white",
  },

  text: {
    fontSize: 25,
    color: "#FFF",
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 'bold',
  },
})
