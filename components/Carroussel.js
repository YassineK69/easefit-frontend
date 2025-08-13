import { useRef , useState} from "react";
import { Dimensions, Text, View, StyleSheet, Image } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import ModaleComponent from "./ModaleComponent";

const width = Dimensions.get("window").width;
const height = 250;




//***************************************** */
export default function Carroussel(props) {
  
  const data = props.selectedActivity.activitiesPic.map((uri,i)=>{
    const newObj = {
      id: i+1,
      uri: uri,
    };
    return newObj;
  })
  data.unshift({ id: 0})
  console.log(data)

  const ref = useRef(null);
  const progress = useSharedValue(0);

  const onPressPagination = (index) => {
    ref.current.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={{borderWidth: 0, borderColor: "#fafafa" }}>
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

            return (
              <View
                style={{
                  flex: 1,
                  borderWidth: 0,
                  justifyContent: "center",
                  
                }}
              >
                <Image  source={{uri: item.uri} }  style={styles.image} />
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
