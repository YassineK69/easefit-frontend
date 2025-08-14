import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  ImageBackground,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import Dropdown from "../components/sporttype";
import { useState } from "react";
import CustomTabBarBackground from "../components/CustomTabBarBackground";
import Carroussel from "../components/Carroussel";

export default function ListScreen({ navigation }) {
  const activities = useSelector((state) => state.activities.value);
  const [displayactivity, setdisplayactivity] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const filteredActivities = displayactivity
    ? activities.filter((activity) => activity.type === displayactivity)
    : activities;
  const sortedActivities = filteredActivities
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handlePress = (activity) => {
    setSelectedActivity(activity);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => {
    const { title, type, date  } = item;

    //Modif, ajout handlepress
    return (
      <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>Sport : {type}</Text>
        <Text style={styles.detail}>
          Date :{" "}
          {new Date(date).toLocaleDateString("fr-FR").replace(/\//g, ".")}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <CustomTabBarBackground style={styles.backgroundGradient} />
        <Text style={styles.header}>Mes Activités</Text>
        <View style={styles.h2}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TabNavigator", { screen: "Home" })
            }
            style={{ padding: 8 }}
          >
            <FontAwesome
              name="arrow-left"
              size={20}
              color="white"
              style={styles.arrow}
            />
          </TouchableOpacity>
          <Dropdown
            selectSportType={setdisplayactivity}
            value={displayactivity}
          />
        </View>
      </View>
      <FlatList
        data={sortedActivities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Carroussel selectedActivity={selectedActivity} />
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fermer</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

/*
 
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 70,
    marginLeft: 20,
    marginBottom: 0,
    color: "white",
  },
  h2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingRight: 20,
    justifyContent: "space-between",
  },
  arrow: {
    marginLeft: 20,
    marginBottom: 20,
    paddingTop: 30,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: 310,
    padding: 16,
    borderRadius: 25,
    borderBottomColor: "red",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  detail: {
    fontSize: 16,
    color: "#555",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  modalHeader: {
    paddingVertical: 30,
    alignItems: "center",
  },
  modalHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  modalImageBackground: {
    height: 150,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  modalTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalDuration: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  starContainer: {
    flexDirection: "row",
  },
  star: {
    color: "white",
    fontSize: 20,
    marginHorizontal: 2,
  },
  modalContent: {
    padding: 20,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#7b46f6",
    borderRadius: 15,
    shadowColor: "#7b46f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    padding: 10,
    margin: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
