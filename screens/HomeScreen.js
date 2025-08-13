import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
  ImageBackground,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useSelector } from "react-redux";
import ModaleComponent from "../components/ModaleComponent";
import Carroussel from "../components/Carroussel";

export default function HomeScreen({ navigation }) {
  // Date du jour au format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  // Récupération du token et prénom depuis Redux
  const token = useSelector((state) => state.user.value.token);
  const firstName = useSelector((state) => state.user.value.firstName);

  // États pour gérer les données du calendrier et la modal
  const [markedDates, setMarkedDates] = useState({});
  const [allActivities, setAllActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Couleurs associées aux types de sport
  const sportColors = {
    Muscu: "#b30bf5",
    Course: "#3b82f6",
    Fitness: "#10b981",
  };

  const handleModalVisible = (value) => {
    setModalVisible(value);
  };

  // Chargement des activités dès que le token est disponible

  const dataActivities = useSelector((state) => state.activities.value);
  //console.log("dataActivities",dataActivities);

  useEffect(() => {
    const data = dataActivities;

    const newMarkedDates = {};

    // Marquer la date du jour
    newMarkedDates[today] = {
      selected: true,
      selectedColor: "#5e2a84",
    };

    // Formater les données pour ne garder que ce qui est nécessaire
    const formattedActivities = data.map((act) => {
      const formattedDate = act.date.split("T")[0];

      // Couleur en fonction du type, gris si inconnu
      const dotColor = sportColors[act.type] || "#999999";

      // Ajouter une seule pastille par date (la première rencontrée)
      if (!newMarkedDates[formattedDate]) {
        newMarkedDates[formattedDate] = {
          marked: true,
          dotColor,
        };
      }

      // Retourner uniquement les infos utiles pour la modal
      return {
        date: formattedDate,
        title: act.title || "Sans titre",
        duration: act.duration || 0,
        rating: act.grade || 0,
        description: act.comment || "Pas de description",
        activitiesPic: act.activitiesPic,
      };
    });

    setMarkedDates(newMarkedDates);
    setAllActivities(formattedActivities);
  }, [token]);

  // Gestion du clic sur une date → ouverture de la modal avec les infos formatées
  const handleDayPress = (day) => {
    const clickedDate = day.dateString;

    const activity = allActivities.find((act) => act.date === clickedDate);

    if (activity) {
      setSelectedActivity(activity);
      setModalVisible(true);
    } else {
      setSelectedActivity(null);
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- EN-TÊTE --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello {firstName || "!"}</Text>
          <Text style={styles.subTitle}>Vos activités</Text>
        </View>
        {/* Bouton + pour ajouter une activité */}
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => navigation.navigate("NewActivity")}
        >
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>

      {/* --- BOUTON VUE LISTE --- */}
      <View style={styles.listViewContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("List")}>
          <Text style={styles.listViewText}>Vue liste ➤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* --- CALENDRIER --- */}
      <View style={styles.calendarSection}>
        <Calendar
          current={today}
          markingType={"simple"}
          markedDates={markedDates}
          onDayPress={handleDayPress}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#5e2a84ff",
            selectedDayBackgroundColor: "#84562aff",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#35df13",
            dayTextColor: "#000000ff",
            textDisabledColor: "#d9e1e8",
            arrowColor: "#5e2a84",
            monthTextColor: "#da341b",
            indicatorColor: "#2a8484ff",
            textDayFontSize: 10,
            textMonthFontSize: 14,
            textDayHeaderFontSize: 10,
            textMonthFontWeight: "bold",
          }}
        />
      </View>

      <View style={styles.divider} />

      {/* --- GRAPHIQUE PLACEHOLDER --- */}
      <Text style={styles.monthTitle}>Ce dernier mois</Text>
      <TouchableOpacity
        style={styles.chartContainer}
        onPress={() => navigation.navigate("Graphs")}
      >
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>[ Graphique ici (API) ]</Text>
        </View>
      </TouchableOpacity>

      {/* --- MODAL D'ACTIVITÉ --- */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { fontSize: 24, fontWeight: "bold", color: "#5e2a84" },
  subTitle: {
    fontSize: 16,
    color: "#5e2a84",
    fontWeight: "bold",
    marginTop: 4,
  },
  addButtonContainer: {
    backgroundColor: "#da341b",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: { fontSize: 28, color: "#fff", lineHeight: 28 },
  listViewContainer: {
    alignItems: "flex-end",
    marginBottom: 5,
    paddingRight: 20,
  },
  listViewText: { color: "#000000ff", fontSize: 14 },
  divider: {
    height: 3,
    alignSelf: "center",
    borderRadius: 4,
    backgroundColor: "#5e2a84",
    width: "70%",
    marginVertical: 10,
  },
  calendarSection: { marginBottom: 20, paddingHorizontal: 20 },
  monthTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  chartContainer: { alignItems: "center", marginTop: 10 },
  placeholderBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  placeholderText: { color: "#999", fontStyle: "italic" },

  // --- MODAL styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 25,
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
  starContainer: { flexDirection: "row" },
  star: {
    color: "#ffd700",
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
    backgroundColor: "#5e2a84",
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  closeButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
