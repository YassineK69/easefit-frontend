import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addNewActivity } from "../reducers/activities";
import * as ImagePicker from "expo-image-picker";

import Dropdown from "../components/sporttype";
import ActivityDateModal from "../components/activitydate";
import ActivityDurationModal from "../components/activityduration";

export default function NewActivityScreen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.token);
  const [errorMessage, setErrorMessage] = useState("");
  const [activityTitle, setActivityTitle] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [activityComment, setActivityComment] = useState("");
  const [activityType, setActivityType] = useState(null);
  const [activityDate, setActivityDate] = useState(new Date());
  const [activityGrade, setActivityGrade] = useState(0);
  const [activityImageUri, setActivityImageUri] = useState(null);
  const [activityImageName, setActivityImageName] = useState(null);

  const resetForm = () => {
    setActivityTitle("");
    setActivityType("");
    setActivityDate(new Date());
    setActivityDuration(30);
    setActivityGrade("");
    setActivityComment("");
    setActivityImageUri(null);
    setActivityImageName(null);
  };

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

  const handleRegister = () => {
    if (
      !activityTitle ||
      !activityType ||
      !activityDuration ||
      !activityDate ||
      !activityGrade
    ){
      setErrorMessage("Des champs n'ont pas été complétés");
      return;
    }
      

    const formData = new FormData();
    formData.append("title", activityTitle);
    formData.append("type", activityType);
    formData.append("date", activityDate.toUTCString());
    formData.append("duration", activityDuration);
    formData.append("grade", activityGrade);
    formData.append("comment", activityComment);

    if (activityImageUri) {
      formData.append("activitiesPic", {
        uri: activityImageUri,
        name: activityImageUri.split("/").pop(),
        type: "image/jpeg",
      });
    }

    fetch(
      `${process.env.EXPO_PUBLIC_URL_VERCEL}/activities/newactivity/${token}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addNewActivity(data.newActivity));
          resetForm();
          navigation.navigate("TabNavigator", { screen: "Home" });
        } else {
          setErrorMessage(data.error);
          console.log("data" , data)
        }
      });
  };

  const handleStarPress = (index) => {
    setActivityGrade(index + 1);
  };

  const handleCommentKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Enter") {
      Keyboard.dismiss();
    }
  };

  const handleCommentChange = (text) => {
    const filteredText = text.replace(/[\n\r]/g, "");
    setActivityComment(filteredText);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ImageBackground
        source={require("../assets/fondnewactivity.jpg")}
        style={styles.background}
        blurRadius={2}
      >
        <View style={styles.overlay} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Nouvelle Activité</Text>

            {/* Titre */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Titre</Text>
              <TextInput
                placeholder="Activité du jour"
                placeholderTextColor="rgba(255,255,255,0.6)"
                style={styles.input}
                onChangeText={setActivityTitle}
                value={activityTitle}
              />
            </View>

            {/* Sport */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Sport</Text>
              <Dropdown selectSportType={setActivityType} />
            </View>

            {/* Durée */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Durée</Text>
              <ActivityDurationModal
                selectActivityDuration={setActivityDuration}
              />
            </View>

            {/* Date */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date</Text>
              <ActivityDateModal
                selectedDate={activityDate}
                selectActivityDate={setActivityDate}
              />
            </View>

            {/* Upload */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Photos/Vidéos</Text>
              <TouchableOpacity
                style={styles.fakeInput}
                onPress={handleGallery}
              >
                <FontAwesome name="upload" size={22} color="#fff" />
              </TouchableOpacity>
              {activityImageName && (
                <Text style={{ color: "white", marginTop: 5 }}>
                  {activityImageName}
                </Text>
              )}
            </View>

            {/* Commentaire */}
            <ScrollView
              style={{ maxHeight: 120, marginBottom: 20 }}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                placeholder="Mes impressions..."
                placeholderTextColor="rgba(255,255,255,0.6)"
                multiline
                style={styles.comment}
                onChangeText={handleCommentChange}
                value={activityComment}
                onKeyPress={handleCommentKeyPress}
                blurOnSubmit={true}
                returnKeyType="done"
              />
            </ScrollView>

            {/* Étoiles */}
            <View style={styles.grade}>
              {[...Array(5)].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleStarPress(index)}
                >
                  <FontAwesome
                    name={index < activityGrade ? "star" : "star-o"}
                    size={35}
                    color={index < activityGrade ? "#FFD700" : "#888"}
                    style={styles.star}
                  />
                </TouchableOpacity>
              ))}
            </View>
            {/* Message d'erreur éventuel */}
            {errorMessage !== "" && (
              <Text
                style={{
                  color: "red",
                  textAlign: "center",
                  marginVertical: 10,
                }}
              >
                {errorMessage}
              </Text>
            )} 
            {/* Boutons */}
            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelBtn]}
                onPress={() =>
                  navigation.navigate("TabNavigator", { screen: "Home" })
                }
              >
                <Text style={styles.cancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveBtn]}
                onPress={handleRegister}
              >
                <Text style={styles.saveText}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
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
  comment: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    minHeight: 90,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    textAlignVertical: "top",
  },
  grade: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 6,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "#fff",
  },
  saveBtn: {
    backgroundColor: "#4a90e2",
  },
  cancelText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  btn: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  secondaryButton: {
    backgroundColor: "white",
    borderRadius: 8,
    width: 145,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    borderColor: "#6B3462",
    borderWidth: 1,
  },
  textButton: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
