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
      <View style={styles.background}>
      <SafeAreaView style={styles.container}>

        <View style={styles.topContainer}>
          {/* Zone gauche vide pour équilibrer */}
          <View style={styles.side} />

          {/* Zone centre */}
          <View style={styles.center}>
            <Image
              source={require("../assets/newlogoorange.png")}
              style={styles.image}
            />
          </View>

          {/* Zone droite */}
          <View style={styles.side}>
            <TouchableOpacity onPress={handdleFilter} style={{ alignSelf: "flex-end" }}>
              <FontAwesome name="filter" size={20} color="#DA341B" />
            </TouchableOpacity>
          </View>
        </View>

        {viewFilter && (
            <View style={styles.filtersContainer}>
              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Entre le :</Text>
                <View>
                  <DatePickerWithModal select={selectStart} />
                </View>
              </View>
              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}> et :</Text>
                <View>
                  <DatePickerWithModal select={selectEnd} />
                </View>
              </View>
            </View>
          )}

        <ScrollView style={{ width: "100%" }}>
            <View style={styles.card}>
                <GraphsDonut start={start} end={end} />
            </View>
            <View style={styles.card}>
                <GraphsDurationBar start={start} end={end} />
            </View>
            <View style={styles.card}>
                <GraphsStars start={start} end={end} />
            </View>

        </ScrollView>
      </SafeAreaView>
      </View>
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
  width: 80,
  height: 80, // beaucoup plus bas
  resizeMode: "contain",
},
  topContainer: {
    flexDirection: "row",
    alignItems: "stretch", // permet aux côtés de prendre toute la hauteur
    marginTop: 20,
    marginBottom : 10
  },
  side: {
    width: 50,
    alignItems: "center",
    justifyContent: "flex-end", // ça pousse le contenu vers le bas
    marginRight : 20,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // logo centré verticalement
  },
  filtersContainer: {
    flexDirection: "row",   
    justifyContent: "flex-end", 
    width: "100%",          
    padding: 10,
    marginRight : 20,
  },
  filterGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10, 
  },
  filterLabel: {
    color: "black",
    paddingRight: 5,
  },
  card: {
    borderRadius: 15,
    marginHorizontal: 16,
    shadowColor: "#7b46f6",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});
