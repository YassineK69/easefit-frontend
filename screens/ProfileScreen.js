import { useState } from "react";
import { ImageBackground, Image, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen({ navigation }) {

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

      <View style={styles.ligne}>
        <View style={styles.line}>
          ''
        </View>
    </View>

        <View style={styles.body}>
          <View style={styles.left}>
          <Text style={styles.text}>Name</Text>
          <Text style={styles.text}>Birth</Text>
          <Text style={styles.text}>Type</Text>
          <Text style={styles.text}>height</Text>
          <Text style={styles.text}>activity</Text>
        </View>
      
        <View style={styles.right}>
          <Text style={styles.text}>Madison Malte</Text>
          <Text style={styles.text}>19 dec 2005</Text>
          <Text style={styles.text}>Woman</Text>
          <Text style={styles.text}>1.50</Text>
          <Text style={styles.text}>6</Text>
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

});
