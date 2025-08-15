import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";

const { width } = Dimensions.get("window");

export default function ModaleComponent(props) {
  const selectedActivity = props.selectedActivity;
  const [viewUploadPic, setViewUploadPic] = useState(false);
  const [activityImageUri, setActivityImageUri] = useState(null);
  const [activityImageName, setActivityImageName] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const token = useSelector((state) => state.user.value.token);
  const dataActivities = useSelector((state) => state.activities.value);
  const dispatch = useDispatch();

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
    setErrorMessage("");
  };

  const handleRegister = () => {
    const formData = new FormData();
    formData.append("idActivity", selectedActivity._id);
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
        if (!data.result) {
          setErrorMessage(data.error);
        }
      });
  };

  return (
    <View style={styles.modalContainer}>
      <ImageBackground
        source={require("../assets/images//fond-d-ecran-iphone-degrade-bulle-d-huile-dans-le-fond-de-l-eau.jpg")}
        imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        blurRadius={1}
      >
        {/* Fond clair semi-opaque pour titre + infos */}
        <View style={styles.headerBackground}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>
              {selectedActivity?.title?.toUpperCase()}
            </Text>

            {/* Bouton galerie entouré */}
            <TouchableOpacity onPress={handleAddPic} style={styles.galleryButton}>
              <FontAwesome
                name={viewUploadPic ? "arrow-up" : "file-photo-o"}
                size={18}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.modalTopRow}>
            <Text style={styles.modalDuration}>
              {selectedActivity?.duration} MIN
            </Text>
            <View style={styles.starContainer}>
              {[...Array(5)].map((_, i) => (
                <Text key={i} style={styles.star}>
                  {i < selectedActivity?.rating ? "★" : "☆"}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </ImageBackground>

      {viewUploadPic ? (
        <View style={styles.uploadContainer}>
          <View style={styles.uploadRow}>
            <TouchableOpacity style={{ margin: 10 }} onPress={handleGallery}>
              <FontAwesome name="upload" size={22} color="#DA341B" />
            </TouchableOpacity>
            {activityImageName && (
              <Text style={styles.imageName}>{activityImageName}</Text>
            )}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
          {errorMessage !== "" && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
        </View>
      ) : (
        <View style={styles.commentContainer}>
          <ScrollView contentContainerStyle={{ padding: 15 }}>
            <Text style={styles.commentText}>
              {selectedActivity?.comment || "Pas de description disponible."}
            </Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: width * 0.9,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  headerBackground: {
    backgroundColor: "rgba(247, 247, 247, 0.11)",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    alignItems: "center",
  },
  modalHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffffff",
  },
  galleryButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#DA341B",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
  },
  modalDuration: {
    color: "#ffffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  starContainer: {
    flexDirection: "row",
  },
  star: {
    color: "#ffd700",
    fontSize: 18,
    marginHorizontal: 2,
  },
  uploadContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 15,
  },
  uploadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageName: {
    color: "#333",
    flex: 1,
    marginLeft: 5,
    marginTop: 5,
  },
  registerButton: {
    backgroundColor: "#6B3462",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  registerButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 5,
  },
  commentContainer: {
    margin: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 15,
    padding: 15,
    maxHeight: 180,
  },
  commentText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
});
