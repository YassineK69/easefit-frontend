import { StyleSheet, Text, View, Image, ImageBackground, KeyboardAvoidingView } from "react-native";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";

export default function Profile({ navigation }) {
  const [userInfos, setUserInfos] = useState({});
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_URL_VERCEL}/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        const Birthday = new Date(data.birthday);
        const date = Birthday.toLocaleDateString("fr");

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
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.header}>
          <FontAwesome name="pencil" size={25} color="white" style={styles.filtre}/>
          <Image
            source={require("../assets/avatar.jpg")}
            style={{ width: 120, height: 120 }}
          />
          <Text style={styles.text}>{userInfos.firstName}</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.contentBody}>
            <Text style={styles.text}>Nom :</Text>
            <Text style={styles.textA}>{userInfos.firstName}</Text>
          </View>
          <View style={styles.contentBody}>
            <Text style={styles.text}>Birthday :</Text>
            <Text style={styles.textA}>{userInfos.birthday}</Text>
          </View>
          <View style={styles.contentBody}>
            <Text style={styles.text}>Genre :</Text>
            <Text style={styles.textA}>{userInfos.gender}</Text>
          </View>
          <View style={styles.contentBody}>
            <Text style={styles.text}>Taille :</Text>
            <Text style={styles.textA}>{userInfos.height}</Text>
          </View>
          <View style={styles.contentBody}>
            <Text style={styles.text}>Activités :</Text>
            <Text style={styles.textA}>{userInfos.idActivities}</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    width: "100%",
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },

  body: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    paddingBottom: 25,
    margin: 20,
  },

  text: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "bold",
  },

  textA: {
    fontSize: 25,
    color: "#ffffffff",
    width:'60%',
    fontWeight: "bold",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderColor: "#8c8c8cff",
    overflow: "hidden",
  },

  contentBody  : {
    flexDirection:'row',
    justifyContent:'space-between', 
    width:'100%',
    alignItems:'center',
    margin: 15,
  },

  filtre: {
    paddingLeft: 300,
    fontSize: 30,
  },
});
