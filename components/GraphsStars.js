import { useState } from "react";
import { CartesianChart, Bar, useChartPressState } from "victory-native";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  LinearGradient,
  vec,
  Circle,
  useFont,
} from "@shopify/react-native-skia";
import inter from "../assets/fonts/Manrope-Regular.ttf";

import { useFonts } from "expo-font";
import { appColors, appColorsBis, activities } from "../consts/appColors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import compareDate from "./compareDate";

//***************************************** */
export default function GraphsStars(props) {
  const [selectActivity, setSelectActivity] = useState(0);
  const [valeurs, setValeurs] = useState({});

  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
  });
  const font = useFont(inter, 12);
  const { state, isActive } = useChartPressState({ x: 0, y: { count: 0 } });

  const dataActivities = useSelector((state) => state.activities.value);

  function traitement(dataActivities, activities, start, end) {
    const dataAll = {};
    for (let type of activities) {
      const dataType = [];
      let filtre = dataActivities.filter(
        (obj) => obj.type === type && compareDate(obj["date"], start, end)
      );
      for (let i = 1; i <= 5; i++) {
        let filtre2 = filtre.filter((obj) => obj.grade === i);
        dataType.push({ grade: i, count: filtre2.length });
      }
      dataAll[type] = dataType;
    }
    // sur toutes les activités
    const dataType = [];
    let filtre = dataActivities.filter((obj) =>
      compareDate(obj["date"], start, end)
    );
    for (let i = 1; i <= 5; i++) {
      let filtre2 = filtre.filter((obj) => obj.grade === i);
      dataType.push({ grade: i, count: filtre2.length });
    }
    dataAll["TOTAL"] = dataType;

    return dataAll;
  }

  const dataAll = traitement(
    dataActivities,
    activities,
    props.start,
    props.end
  );

  function ToolTip({ x, y, s }) {
    setValeurs(
      dataAll[activitiesWidthTotal[selectActivity]][s.matchedIndex.value]
    );
    return <Circle cx={x} cy={y} r={8} color="black" />;
  }
  const activitiesWidthTotal = [...activities, "TOTAL"];
  const affichage = dataAll[activitiesWidthTotal[selectActivity]];

  const legend = activitiesWidthTotal.map((type, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 4,
          marginBottom : 4,
          justifyContent: "center",
          width:"48%",
        }}
        onPress={() => setSelectActivity(i)}
      >
        <FontAwesome
          name="circle"
          size={15}
          color={appColors[type]}
          style={{ marginLeft: 0 }}
        />
        <Text> {type}</Text>
      </TouchableOpacity>
    );
  });

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const couleur =
      i <= valeurs.grade
        ? appColors[activitiesWidthTotal[selectActivity]]  
        : "rgba(0,0,0,0.2)";
    const star = (
      <FontAwesome
        key={i}
        name="star"
        size={22}
        color={couleur}
        style={{ padding: 4}}
      />
    );
    stars.push(star);
  }

  return (
    <View
      style={{
        height: 450,
        width: "100%",
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ margin: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 18, paddingVertical: 10 }}>NOTATION DES ACTIVITES</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            borderWidth: 0,
            width: "100%",
            flexWrap: "wrap",
            marginBottom : 10,
          }}
        >
          {legend}
        </View>
      </View>

      <CartesianChart
        data={dataAll[activitiesWidthTotal[selectActivity]]}
        xKey="grade"
        yKeys={["count"]}
        axisOptions={{
          font,
          lineColor: "#71717a",
          labelColor: "black",
        }}
        chartPressState={state}
        domain={{ x: [-1, 6] }} //définit les limites xmin, ... sur les axes
        viewport={{ x: [-1, 6] }} //définit les limites xmin, ... sur la partie gu graphe tracée
        domainPadding={{ left: 10, right: 10 }} // complémentaire à padding
      >
        {({ points, chartBounds }) => (
          <>
            <Bar
              points={points.count}
              chartBounds={chartBounds}
              animate={{ type: "timing", duration: 1000 }}
              innerPadding=" 0.5"
              color="blue"
              labels={{ position: "left" }}
              roundedCorners={{ topLeft: 10, topRight: 10 }}
            >
              <LinearGradient
                start={vec(0, 0)}
                end={vec(0, 200)}
                colors={[
                  appColors[activitiesWidthTotal[selectActivity]],
                  appColorsBis[activitiesWidthTotal[selectActivity]],
                ]}
              />
            </Bar>
            {isActive && (
              <ToolTip
                x={state.x.position}
                y={state.y.count.position}
                s={state}
              />
            )}
          </>
        )}
      </CartesianChart>

      <View
        style={{
          flexDirection: "column",
          // padding: 5,
          borderWidth: 0,
          borderColor: "#000",
          width: "100%",
          alignItems: "center", // <-- centre les enfants horizontalement
        }}
      >
        <Text
          style={{
            color: appColors[activitiesWidthTotal[selectActivity]],
            fontSize: 20, 
            marginTop: 15,
            paddingBottom : 5,
            textAlign: "center", // <-- utile pour le texte multi-lignes
          }}
        >
        {valeurs.grade && `${affichage[valeurs.grade - 1].count} activités `}
        {activitiesWidthTotal[selectActivity] === "TOTAL" && "TOTAL"}
        </Text>
          <Text style={{ fontSize: 20, textAlign: "center", paddingBottom : 10 }}>
            {valeurs.grade && stars}
          </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
