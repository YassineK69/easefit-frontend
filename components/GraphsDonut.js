import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Button,
  Text,
} from "react-native";
import { LinearGradient, vec } from "@shopify/react-native-skia";
import { Pie, PolarChart } from "victory-native";
import { useFonts } from "expo-font";
import { appColors } from "../consts/appColors";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function calculateGradientPoints(
  radius,
  startAngle,
  endAngle,
  centerX,
  centerY
) {
  // Calculate the midpoint angle of the slice for a central gradient effect
  const midAngle = (startAngle + endAngle) / 2;

  // Convert angles from degrees to radians
  const startRad = (Math.PI / 180) * startAngle;
  const midRad = (Math.PI / 180) * midAngle;

  // Calculate start point (inner edge near the pie's center)
  const startX = centerX + radius * 0.5 * Math.cos(startRad);
  const startY = centerY + radius * 0.5 * Math.sin(startRad);

  // Calculate end point (outer edge of the slice)
  const endX = centerX + radius * Math.cos(midRad);
  const endY = centerY + radius * Math.sin(midRad);

  return { startX, startY, endX, endY };
}

const activities = ["muscu", "course", "fitness"];

function traitementNombre(data) {
  const DATA = [];
  for (let type of activities) {
    let filtre = data.filter((obj) => obj.type === type);
    DATA.push({
      value: filtre.length,
      color: appColors[type],
      label: type,
    });
  }
  return DATA;
}
function traitementDuree(data) {
  const DATA = [];
  for (let type of activities) {
    let filtre = data.filter((obj) => obj.type === type);
    const initialValue = 0;
    const sumDuration = filtre.reduce(
      (accumulator, currentValue) => accumulator + currentValue.duration,
      initialValue
    );
    DATA.push({
      value: sumDuration,
      color: appColors[type],
      label: type,
    });
  }
  return DATA;
}

const legend = activities.map((type) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <FontAwesome
        name="circle"
        size={15}
        color={appColors[type]}
        style={{ marginLeft: 0 }}
      />
      <Text> : {type}</Text>
    </View>
  );
});

export default function GraphDonut(props) {
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
  });

  const DATA =
    props.type === "number"
      ? traitementNombre(props.data)
      : traitementDuree(props.data);
  const comment = props.type === "number" ? " activités" : " mn";
  const results = activities.map((type, i) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome
          name="circle"
          size={15}
          color={appColors[type]}
          style={{ marginLeft: 0 }}
        />
        <Text>
          {" "}
          : {DATA[i]["value"]} {comment}{" "}
        </Text>
      </View>
    );
  });

  return (
    <View
      style={{
        height: 300,
        width: "95%",
        borderWidth: 1,
        margin: "auto",
        marginTop: 50,
        backgroundColor: "#fff",
        borderRadius: 2,
      }}
    >
      <View style={{ margin: 10, borderWidth: 1, borderColor: "#000" }}>
        <Text
          style={{
            margin: "auto",
            width: "min-content",
            borderWidth: 1,
            borderColor: "#000",
          }}
        >
          {props.type === "number"
            ? "Nombre total d'activités"
            : "Durée totale des activités"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {legend}
        </View>
      </View>
      <PolarChart
        data={DATA}
        colorKey={"color"}
        valueKey={"value"}
        labelKey={"label"}
        containerStyle={{
          borderColor: "#f00",
          padding: 5,
          margin: 5,
          borderWidth: 1,
          color: "#000",
        }}
        canvasStyle={{ borderWidth: 1, color: "#000", padding: 10 }}
      >
        <Pie.Chart innerRadius={"40%"}>
          {({ slice }) => {
            const { startX, startY, endX, endY } = calculateGradientPoints(
              slice.radius,
              slice.startAngle,
              slice.endAngle,
              slice.center.x,
              slice.center.y
            );

            return (
              <>
                <Pie.Slice animate={{ type: "spring" }}>
                  <LinearGradient
                    start={vec(startX, startY)}
                    end={vec(endX, endY)}
                    colors={[slice.color, `${slice.color}50`]}
                    positions={[0, 1]}
                  />
                </Pie.Slice>
                <Pie.SliceAngularInset
                  animate={{ type: "spring" }}
                  angularInset={{
                    angularStrokeWidth: 5,
                    angularStrokeColor: "white",
                  }}
                />
              </>
            );
          }}
        </Pie.Chart>
      </PolarChart>
      <View
        style={{
          margin: 10,
          borderWidth: 1,
          borderColor: "#000",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {results}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: "white",
    $dark: {
      backgroundColor: "white",
    },
  },
  chartContainer: {
    height: 400,
    padding: 25,
  },
});
