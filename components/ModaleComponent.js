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
  ScrollView,
} from "react-native";

export default function ModaleComponent(props) {
  const selectedActivity = props.selectedActivity;
  return (
    <View style={styles.modalContainer}>
      
      {/* Image de fond + titre + minutes + étoiles */}
      <ImageBackground
        source={require("../assets/fondnewactivity.jpg")}
        style={styles.modalImageBackground}
        imageStyle={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderTitle}>
            {selectedActivity?.title?.toUpperCase()}
          </Text>
        </View>

        <View style={styles.modalTopRow}>
          {/* Minutes */}
          <Text style={styles.modalDuration}>
            {selectedActivity?.duration} MIN
          </Text>
          {/* Étoiles */}
          <View style={styles.starContainer}>
            {[...Array(5)].map((_, i) => (
              <Text key={i} style={styles.star}>
                {i < selectedActivity?.rating ? "★" : "☆"}
              </Text>
            ))}
          </View>
        </View>
      </ImageBackground>

      {/* Contenu texte (zone de description) */}
      <View style={styles.modalContent}>
        <ScrollView>
          <Text style={styles.modalDescription}>
            {selectedActivity?.description}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    backgroundColor: "#fafafa",
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
    paddingVertical: 10,
  },
  closeButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
