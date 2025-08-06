import { View } from "react-native";
import { CartesianChart } from "victory-native";

// ...

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  highTmp: 40 + 30 * Math.random(),
}));


function MyChart() {
  return (
    <View style={{ height: 300 }}>
      // 👇 start our chart
      <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]} />
    </View>
  );
}

export default MyChart;
 