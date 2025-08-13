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
import { Circle, useFont, vec } from "@shopify/react-native-skia";
import { useState } from "react";
import { LinearGradient } from "@shopify/react-native-skia";
import { useFonts } from "expo-font";
import inter from "../assets/fonts/Manrope-Regular.ttf";
import { appColors } from "../consts/appColors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import compareDate from "./compareDate";

const DATA = Array.from({ length: 5 }, (_, i) => ({
  day: i,
  lowTmp: 20 + 10 * Math.random(),
  highTmp: 40 + 30 * Math.random(),
}));

function GraphsBar(props) {
  const font = useFont(inter, 12);
  const [valeurs, setValeurs] = useState({});
  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
  });

  function ToolTip({ x, y, s }) {
    setValeurs(DATA[s.matchedIndex.value]);
    return <Circle cx={x} cy={y} r={8} color="black" />;
  }

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
            fontFamily: "Manrope-Regular",
          }}
        >
          Commentaire
        </Text>
      </View>
      <CartesianChart
        data={DATA}
        xKey="day"
        yKeys={["highTmp"]}
        axisOptions={{
          font,
          lineColor: "#71717a",
          labelColor: "black",
        }}
        chartPressState={state}
        domain={{ x: [-1, 5], y: [0, 100] }} //définit les limites xmin, ... sur les axes
        viewport={{ x: [-1, 5] }} //définit les limites xmin, ... sur la partie gu graphe tracée
        domainPadding={{ left: 1, right: 0 }} // complémentaire à padding
      >
        {({ points, chartBounds }) => (
          <>
            <Bar
              points={points.highTmp}
              chartBounds={chartBounds}
              animate={{ type: "timing", duration: 1000 }}
              innerPadding=" 0.5"
              color="blue"
              labels={{ position: "left" }}
              roundedCorners={{ topLeft: 10, topRight: 10 }}
            >
              <LinearGradient
                start={vec(0, 0)}
                end={vec(0, 400)}
                colors={["green", "#90ee9050"]}
              />
            </Bar>
            {isActive && (
              <ToolTip
                x={state.x.position}
                y={state.y.highTmp.position}
                s={state}
              />
            )}
          </>
        )}
      </CartesianChart>
      <View style={{ margin: 10, borderWidth: 1, borderColor: "#000" }}>
        <Text
          style={{
            margin: "auto",
            width: "min-content",
            borderWidth: 1,
            borderColor: "#000",
          }}
        >
          {valeurs.day}
        </Text>
      </View>
    </View>
  );
}

export default GraphsBar;
