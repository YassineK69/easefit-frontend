import { ImageBackground, Image, StyleSheet, Text, View, TextInput } from "react-native";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Profile({ navigation }) {

  const [userInfos, setUserInfos] = useState({});

  const user = useSelector((state) => state.user.value)
  console.log(user);

  useEffect(() => {
     fetch(`http://10.0.0.179:3000/users/${user.token}`)
     .then(response => response.json())
     .then(data => {
       setUserInfos(data);
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
          <Text style={styles.text}>{userInfos.firstName}</Text>
        </View>
  
    <View style={styles.ligne}>
        <View style={styles.line}>
          ''
        </View>
    </View>
        <View style={styles.body}>
          <View style={styles.left}>
          <Text style={styles.text}>Nom :</Text>
          <Text style={styles.text}>Birthday :</Text>
          <Text style={styles.text}>Genre :</Text>
          <Text style={styles.text}>Taille :</Text>
          <Text style={styles.text}>Activité :</Text>
        </View>
      
        <View style={styles.right}>
          <Text style={styles.textA}>{userInfos.firstName}</Text>
          <Text style={styles.textA}>{userInfos.birthday}</Text>
          <Text style={styles.textA}>{userInfos.gender}</Text>
          <Text style={styles.textA}>{userInfos.height}</Text>
          <Text style={styles.textA}>{userInfos.idActivities}</Text>
      </View>
   </View>

    <View style={styles.ligne}>
        <View style={styles.line}>
          ''
        </View>
    </View>

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
    width: '150%',
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 20,
    paddingRight: 190,
  },

  body: {
    flexDirection: "row",
    alignItems:'center',
    justifyContent:'center',
  },

  left: {
   paddingTop: 10,
   paddingBottom: 10,
   paddingLeft: 50,
  }, 

  right: {
   paddingTop: 10,
   paddingBottom: 10,
  },

  ligne: {
    paddingBottom:15,
    paddingTop: 20,
  },

  line:{
    borderWidth:1,
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

  textA: {
    fontSize: 25,
    color: "#FFF",
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 'bold',
  }
  
})
