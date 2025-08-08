import { CartesianChart, BarGroup, useChartPressState } from "victory-native";
import { View, Text } from "react-native";
import inter from "../assets/fonts/Manrope-Regular.ttf";
import { Circle, useFont, vec } from "@shopify/react-native-skia";
import { useState } from "react";
import { LinearGradient } from "@shopify/react-native-skia";
import { useFonts } from "expo-font";

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  lowTmp: 20 + 10 * Math.random(),
  highTmp: 40 + 30 * Math.random(),
}));
console.log(DATA);

function GraphsMultiBars(props) {
  const font = useFont(inter, 12);
  const [valeurs, setValeurs] = useState({});
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
  });

  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });

  function ToolTip({ x, y, s }) {
    console.log(s);
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
          }}
        >
          Commentaire
        </Text>
      </View>
      <CartesianChart
        data={DATA}
        xKey="day"
        yKeys={["lowTmp", "highTmp"]}
        axisOptions={{
          font,
          lineColor: "#71717a",
          labelColor: "black",
        }}
        chartPressState={state}
        domain={{ x: [-0.2, 6], y: [0, 100] }} //définit les limites xmin, ... sur les axes
        domainPadding={{ left: 10, right: 0 }} // complémentaire à padding
      >
        {({ points, chartBounds }) => (
          <>
            <BarGroup
              chartBounds={chartBounds}
              barWidth={10}
              betweenGroupPadding={3}
              withinGroupPadding={1.2}
              roundedCorners={{ topLeft: 10, topRight: 10 }}
            >
              <BarGroup.Bar points={points.lowTmp} animate={{ type: "timing" }}>
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(0, 250)}
                  colors={["green", "#90ee9050"]}
                />
              </BarGroup.Bar>
              <BarGroup.Bar
                points={points.highTmp}
                animate={{ type: "timing" }}
              >
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(0, 250)}
                  colors={["#be185d90", "#dad0d5ff"]}
                />
              </BarGroup.Bar>
              <BarGroup.Bar points={points.lowTmp} animate={{ type: "timing" }}>
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(0, 250)}
                  colors={["#a5f3fc", "#0891b290"]}
                />
              </BarGroup.Bar>
            </BarGroup>
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

export default GraphsMultiBars;
