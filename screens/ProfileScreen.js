import { ImageBackground, Image, StyleSheet, Text, View, TextInput } from "react-native";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Profile({ navigation }) {

  const [userInfos, setUserInfos] = useState({});
  console.log(userInfos)
  const user = useSelector((state) => state.user.value)
  
  useEffect(() => {
     fetch(`${process.env.EXPO_PUBLIC_URL_VERCEL}/users/${user.token}`)
     .then(response => response.json())
     .then(data => {

      const Birthday = new Date(data.birthday)
      const date = Birthday.toLocaleDateString("fr")

      const dateInfo = {
      firstName: data.firstName,
      birthday: date,
      gender: data.gender,
      height: data.height,
      idActivities: data.idActivities,
    };

       setUserInfos(dateInfo);
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
    borderBottomWidth: 2,
    borderBottomColor: "white"
  },

  body: {
    flexDirection: "row",
    alignItems:'center',
    justifyContent:'center',
    borderBottomWidth: 2,
    borderBottomColor: "white",
    paddingBottom: 25
  },

  left: {
   paddingTop: 10,
   paddingBottom: 10,
  }, 

  right: {
   paddingTop: 10,
   paddingBottom: 10,
   paddingRight: 150
  },

  text: {
    fontSize: 25,
    color: "#FFF",
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 15,
    fontWeight: 'bold',
  },

  textA: {
    fontSize: 25,
    color: "#FFF",
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 10,
    fontWeight: 'bold',
  }
})
