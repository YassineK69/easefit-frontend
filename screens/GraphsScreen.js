import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import fontGraph from "../assets/fonts/Manrope-Regular.ttf";
import GraphsBar from "../components/GraphsBar";
import GraphsDonut from "../components/GraphsDonut";
import GraphsMultiBars from "./GraphsMultiBars";
import { useSelector } from 'react-redux';


//Jeu de données tests
// function createDateRandom() {
//   let month = Math.floor(Math.random()*12) + 1;
//   month = month > 9 ? parseInt(month) :  '0'+parseInt(month)
//   let day = Math.floor(Math.random()*28) + 1;
//   day = day > 9 ? parseInt(day) :  '0'+parseInt(day)  
//   return `2025-${month}-${day}T00:00:00.000+00:00`
// }
// const activities = ['muscu', 'course', 'fitness'];
// const data = Array.from({ length: 10 }, (_, i) => ({
//   title: `activité ${i}`,
//   type: activities[Math.floor(Math.random() * activities.length)],
//   date: createDateRandom(),
//   duration: Math.trunc(180*Math.random())+1,
//   grade: Math.trunc(5*Math.random())+1,
// }));
// console.log('data récupérée : ',data)
//*********************************** */


export default function GraphsScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
  });
  const friends = useSelector((state) => state.activities.value);
  return (
    <LinearGradient
      colors={["#703561", "#d5341e"]}
      start={{ x: 0.8, y: 0.3 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TabNavigator", { screen: "Home" })
            }
            style={{ borderWidth: 1 }}
          >
            <FontAwesome
              name="caret-left"
              size={50}
              color="#fff"
              style={{ marginLeft: 20 }}
            />
          </TouchableOpacity>
          <Image
            source={require("../assets/whitelogo.png")}
            style={styles.image}
          />
          <View>
            <TouchableOpacity onPress={() => console.log("Click sur Filtres")}>
              <FontAwesome
                name="filter"
                size={30}
                color="#fff"
                style={{ marginRight: 20, marginBottom: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{width:"100%"}}>
          <GraphsDonut data = {data} type="number" />
          <GraphsMultiBars data = {data} />
          <GraphsDonut data = {data} type="duration" />

          <GraphsBar data = {data} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: "80%",
    marginTop: 20,
    backgroundColor: "#ec6e5b",
    borderRadius: 10,
    marginBottom: 10,
  },
  textButton: {
    color: "#ffffff",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  topContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#fff",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 30,
  },
});
