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
import { appColors, appColorsBis , activities } from "../consts/appColors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import compareDate from "./compareDate";

//***************************************** */
export default function GraphsDurationBar(props) {
  const [selectActivity, setSelectActivity] = useState(0);
  const [valeurs, setValeurs] = useState({});

  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
  });
  const font = useFont(inter, 12);
  const { state, isActive } = useChartPressState({ x: 0, y: { count: 0 } });

  const dataActivities = useSelector((state) => state.activities.value);
  const nb = 9;

  function traitement(dataActivities, activities, start, end) {
    const pas = Math.floor(180 / nb);
    const dataAll = {};
    for (let type of activities) {
      const dataType = [];
      let filtre = dataActivities.filter(
        (obj) => obj.type === type && compareDate(obj["date"], start, end)
      );
      for (let time = pas; time <= 180; time += pas) {
        let filtre2 = filtre.filter(
          (obj) => obj.duration > time - 20 && obj.duration <= time
        );
        dataType.push({ time: time, count: filtre2.length });
      }
      dataAll[type] = dataType;
    }
    // sur toutes les activités
    const dataType = [];
    let filtre = dataActivities.filter((obj) =>  compareDate(obj["date"], start, end));
    for (let time = pas; time <= 180; time += pas) {
      let filtre2 = filtre.filter(
        (obj) => obj.duration > time - 20 && obj.duration <= time
      );
      dataType.push({ time: time, count: filtre2.length });
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
    setValeurs(dataAll[activitiesWidthTotal[selectActivity]][s.matchedIndex.value]);
    return <Circle cx={x} cy={y} r={8} color="black" />;
  }
  const activitiesWidthTotal = [...activities , "TOTAL"];
  const affichage = dataAll[activitiesWidthTotal[selectActivity]]

  const legend = activitiesWidthTotal.map((type, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 4,
          justifyContent: "center",
          borderWidth:0,
          borderColor:"rgba(0,0,0,0.5)",
          padding: 8,
          width:"48%",
        }}
        onPress={() => setSelectActivity(i)}
      >
        <FontAwesome
          name="circle"
          size={20}
          color={ appColors[type]}
          style={{ marginLeft: 0 }}
        />
        <Text> : {type}</Text>
      </TouchableOpacity>
    );
  });


  return (
    <View
      style={{
        height: 450,
        width: "100%",
        borderWidth: 1,
        margin: "auto",
        marginTop: 30,
        marginBottom: 0,
        backgroundColor: "#fff",
        borderRadius: 2,
      }}
    >
      <View style={{ margin: 10, borderWidth: 1, borderColor: "#aaa" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 20 }}>DUREE DES ACTIVITES</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            borderWidth: 0,
            width:'100%', 
            flexWrap:"wrap",
          }}
        >
          {legend}
        </View>
      </View>

      <CartesianChart
        data={dataAll[activitiesWidthTotal[selectActivity]]}
        xKey="time"
        yKeys={["count"]}
        axisOptions={{
          font,
          lineColor: "#71717a",
          labelColor: "black",
        }}
        chartPressState={state}
        domain={{ x: [-10, 200] }} //définit les limites xmin, ... sur les axes
        viewport={{ x: [-10, 200] }} //définit les limites xmin, ... sur la partie gu graphe tracée
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
          padding: 5,
          borderWidth: 0,
          borderColor: "#000",
          margin: "auto",
          fontSize: 20,
          width: "100%",
        }}
      >
         <Text style={{ color: appColors[activitiesWidthTotal[selectActivity]] , fontSize:22, margin:'auto'}}>
          {valeurs.time && `${affichage[valeurs.time / (Math.floor(180 / nb)) -1].count} activités `}
          {activitiesWidthTotal[selectActivity] !=="TOTAL"&& activitiesWidthTotal[selectActivity].toUpperCase()}
          {activitiesWidthTotal[selectActivity] ==="TOTAL"&& "au TOTAL"}

        </Text>
        <Text style={{ fontSize: 20 , margin:'auto' }}> 
          {valeurs.time && `DUREE entre ${valeurs.time - Math.floor(180 / nb)} mn et ${valeurs.time} mn`}
          {!valeurs.time && `PRESSEZ sur une barre `}

        </Text>
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
