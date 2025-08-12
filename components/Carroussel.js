import { useRef , useState} from "react";
import { Dimensions, Text, View, StyleSheet, Image } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import ModaleComponent from "./ModaleComponent";

const data = [
  { id:0},
  { id: 1, title: "Image 1", src: require("../assets/fond1.jpg") },
  { id: 2, title: "Image 2", src: require("../assets/fond2.jpg") },
  { id: 3, title: "Image 3", src: require("../assets/gym.png") },
];
const width = Dimensions.get("window").width;
const height = 250;

//***************************************** */
export default function Carroussel(props) {
  const ref = useRef(null);
  const progress = useSharedValue(0);

  const onPressPagination = (index) => {
    ref.current.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={{ borderWidth: 0, borderColor: "#fff" }}>
      <Carousel
        ref={ref}
        width={width}
        height={height}
        data={data}
        onProgressChange={progress}
        renderItem={({ item }) => {
          if (item.id === 0) {
            return <ModaleComponent selectedActivity={props.selectedActivity} />;
          } else {
            console.log(item.id,height);

            return (
              <View
                style={{
                  flex: 1,
                  borderWidth: 0,
                  justifyContent: "center",
                  
                }}
              >
                <Image source={item.src} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            );
          }
        }}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
        style={{ borderWidth: 0, borderColor: "#fff" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height,
    resizeMode: "cover",
    borderRadius: 25,

  },
  title: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});
