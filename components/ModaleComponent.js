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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";

export default function ModaleComponent(props) {
  const selectedActivity = props.selectedActivity;
  const [viewUploadPic, setViewUploadPic] = useState(false);
  const [activityImageUri, setActivityImageUri] = useState(null);
  const [activityImageName, setActivityImageName] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const token = useSelector((state) => state.user.value.token);

  const handleGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== "granted") {
      alert("Permission d'accéder à la galerie refusée !");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const fullUri = result.assets[0].uri;
      setActivityImageUri(fullUri);

      const fullName = fullUri.split("/").pop();
      const ext = fullName.split(".").pop();
      const namePart = fullName.slice(0, 8);
      setActivityImageName(`${namePart}...${ext}`);
    }
  };

  const handleAddPic = () => {
    setViewUploadPic(!viewUploadPic);
    setActivityImageUri(null);
    setActivityImageName(null);
  };

  const handleRegister = () => {
    const formData = new FormData();
    formData.append("idActivity", selectedActivity.idActivity);
    if (activityImageUri) {
      formData.append("activitiesPic", {
        uri: activityImageUri,
        name: activityImageUri.split("/").pop(),
        type: "image/jpeg",
      });
    }
    fetch(
      `${process.env.EXPO_PUBLIC_URL_VERCEL}/activities/addPicture/${token}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          //dispatch(addNewActivity(data.newActivity));
          console.log("photo sauvegardée");
        } else {
          setErrorMessage(data.error);
          console.log("erreur", data.error);
        }
      });
  };

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
          <TouchableOpacity
            onPress={() => handleAddPic()}
            style={{ borderWidth: 0, borderColor: "#fff" }}
          >
            <FontAwesome
              name={viewUploadPic ? "arrow-up" : "file-photo-o"}
              size={30}
              color={!viewUploadPic ? "#fff" : "#fff"}
              style={{ padding: 10 }}
            />
          </TouchableOpacity>
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

      {/* Contenu de la fenêtre pour la saisie des images */}
      {viewUploadPic && (
        <View
          style={{
            borderColor: "#f00",
            flexDirection: "row",
            borderWidth: 1,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: 5,
            height: 100,
          }}
        >
          <TouchableOpacity style={{ margin: 10 }} onPress={handleGallery}>
            <FontAwesome name="upload" size={22} color="#000" />
          </TouchableOpacity>
          {activityImageName && (
            <Text style={{ color: "#000", marginTop: 5 }}>
              {activityImageName}
            </Text>
          )}
          <TouchableOpacity
            style={{ backgroundColor: "#000", borderRadius: 10, margin: 5 }}
            onPress={handleRegister}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                margin: 10,
                color: "#fff",
              }}
            >
              Enregistrer
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Contenu texte (zone de description) */}

      <View style={styles.modalContent}>
        <ScrollView>
          <Text style={styles.modalDescription}>
            {selectedActivity?.comment}
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
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
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
  fakeInput: {
    height: 45,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
});
