//
    function formatBirthday(inputDate) {
    const dateObj = new Date(inputDate);
    return dateObj.toISOString().slice(0, 10);
    }
    
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
import GraphsDurationBar from "../components/GraphsDurationBar";
import GraphsDonut from "../components/GraphsDonut";
import GraphsStars from "../components/GraphsStars";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DatePickerWithModal from "../components/SelectDate";

export default function GraphsScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
  });
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [viewFilter, setViewFilter] = useState(false);

  const data = useSelector((state) => state.activities.value);

  const selectStart = (value) => {
    setStart(value.toLocaleDateString());
  };
  const selectEnd = (value) => {
    setEnd(value.toLocaleDateString());
  };
  const handdleFilter = () => {
    setViewFilter(!viewFilter);
    viewFilter && setStart(null);
    viewFilter && setEnd(null);
  };
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
            style={{ borderWidth: 0 }}
          >
            <FontAwesome
              name="caret-left"
              size={50}
              color="#fff"
              style={{ margin: 10 }}
            />
          </TouchableOpacity>
          <Image
            source={require("../assets/whitelogo.png")}
            style={styles.image}
          />
          <View style={{}}>
            <TouchableOpacity onPress={handdleFilter}>
              <FontAwesome
                name="filter"
                size={35}
                color={!viewFilter ? "#fff" : "#888"}
                style={{ margin: 15 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {viewFilter && (
          <View
            style={{
              borderColor: "#fff",
              flexDirection: "row",
              borderWidth: 0,
              justifyContent: "space-between",
              width: "100%",
              padding: 5,
            }}
          >
            <View
              style={{
                borderColor: "#fff",
                flexDirection: "row",
                borderWidth: 0,
              }}
            >
              <Text style={{ padding: 10, color: "#fff" }}>Entre le :</Text>
              <DatePickerWithModal
                select={selectStart}
                backgroundColor="rgba(255, 255, 255, 0.5)"
              />
            </View>
            <View
              style={{
                borderColor: "#fff",
                flexDirection: "row",
                borderWidth: 0,
              }}
            >
              <Text style={{ padding: 10, color: "#fff" }}>et :</Text>
              <DatePickerWithModal
                select={selectEnd}
                backgroundColor="rgba(255, 255, 255, 0.5)"
              />
            </View>
          </View>
        )}

        <ScrollView style={{ width: "100%" }}>
          <GraphsDonut start={start} end={end} />
          <GraphsDurationBar start={start} end={end} />
          <GraphsStars start={start} end={end} />

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
    borderBottomWidth: 1,
    borderColor: "#fff",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 30,
    marginBottom:0,
  },
});
