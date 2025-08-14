import { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import { LinearGradient, vec } from "@shopify/react-native-skia";
import { Pie, PolarChart } from "victory-native";
import { useFonts } from "expo-font";
import { activities , appColors } from "../consts/appColors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import compareDate from "./compareDate";

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

function minutesToHoursMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes.toString().padStart(2, "0")}`;
}

function traitementNombre(dataActivities, start, end) {
  const DATA = [];
  for (let type of activities) {
    let filtre = dataActivities.filter((obj) => {
      return obj["type"] === type && compareDate(obj["date"], start, end);
    });

    DATA.push({
      value: filtre.length,
      color: appColors[type],
      label: type,
    });
  }
  return DATA;
}
function traitementDuree(dataActivities, start, end) {
  const DATA = [];
  for (let type of activities) {
    let filtre = dataActivities.filter(
      (obj) => obj.type === type && compareDate(obj["date"], start, end)
    );
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


//***************************************** */
export default function GraphDonut(props) {
  const [selectDonut, setSelectDonut] = useState(true);
  const [selectActivity, setSelectActivity] = useState(0);

  const dataActivities = useSelector((state) => state.activities.value);

  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
  });

  const dataNombre = traitementNombre(dataActivities, props.start, props.end);
  const dataDuree = traitementDuree(dataActivities, props.start, props.end);

  const DATA = selectDonut ? dataNombre : dataDuree;
  let result;
  if (selectDonut) {
    result = `${DATA[selectActivity]["value"]} activités `;
  } else {
    result = `${minutesToHoursMinutes(DATA[selectActivity]["value"])} de `;
  }

  const legend = activities.map((type, i) => {
    return (
      <View>
      <TouchableOpacity
        key={i}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 4,
          justifyContent: "center",
          paddingTop: 25,
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
      </View>
    );
  });

  return (
    <View
      style={{
        height: 400,
        width: "100%",
        marginTop: 30,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ margin: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <TouchableOpacity 
            style={[
              {width : 120, borderRadius: 8, marginHorizontal: 16, shadowColor: "#7b46f6", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5},
              selectDonut
                ? { backgroundColor: "#6B3462" }
                : { backgroundColor: "white" }
            ]}
            onPress={() => setSelectDonut(true)}
>
            <Text style={{ margin: "auto", paddingVertical: 3, fontSize: 16, color: selectDonut ? "white" : "#6B3462"}}>
              NOMBRE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {width : 120, borderRadius: 8, marginHorizontal: 16, shadowColor: "#7b46f6", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5},
              !selectDonut
                ? { backgroundColor: "#6B3462" }
                : { backgroundColor: "white" },
            ]}
            onPress={() => setSelectDonut(false)}>
            <Text style={{ margin: "auto", paddingVertical: 3, fontSize: 16, color: selectDonut ? "#6B3462" : "white" }}>DUREE</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap:"wrap",
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
          padding: 20,
          margin: 5,
          color: "#000",
          justifyContent : 'center',
        }}
      >
        <Pie.Chart innerRadius={"50%"}>
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

      <Text
        style={{
          margin: 10,
          marginBottom : 20,
          borderWidth: 0,
          borderColor: "#000",
          fontSize: 20,
          alignSelf : 'center',
        }}
      >
        {result}
        <Text style={{ color: appColors[activities[selectActivity]] }}>
          {activities[selectActivity]}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  selectDonut: {
    width: "45%",
    padding: 2,
    margin: 3,
    borderRadius: 10,
  },
});
