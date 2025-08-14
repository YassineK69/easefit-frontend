import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import Dropdown from "../components/gender";
import DatePickerWithModal from "../components/SelectDate";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignUpScreen({ navigation }) {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [height, setHeight] = useState("");

  const selectGender = (value) => setGender(value);
  const selectBirthday = (value) => setBirthday(value);

  const handleSubmit = () => {
    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage("Format email incorrect");
      return;
    }

    const dataUser = {
      email,
      password,
      lastName,
      firstName,
      gender,
      birthday,
      height,
    };

    fetch(`${process.env.EXPO_PUBLIC_URL_VERCEL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ email, token: data.token }));
          setEmail("");
          setPassword("");
          navigation.navigate("TabNavigator", { screen: "Home" });
        } else {
          setErrorMessage(data.error);
        }
      });
  };

  return (
    <ImageBackground
      source={require("../assets/images/conception-abstraite-de-lignes-fluides-violettes.jpg")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.title}>Inscription</Text>

        {/* BlurView avec bords arrondis */}
        <BlurView intensity={80} tint="light" style={styles.blurContainer}>
          <View style={styles.formBlock}>
            <View style={styles.boxInput}>
              <TextInput
                placeholder="Prénom"
                placeholderTextColor="rgba(255,255,255,0.7)"
                autoCapitalize="none"
                onChangeText={setFirstName}
                value={firstName}
                style={styles.input}
              />
            </View>

            <View style={styles.boxInput}>
              <TextInput
                placeholder="Nom"
                placeholderTextColor="rgba(255,255,255,0.7)"
                autoCapitalize="none"
                onChangeText={setLastName}
                value={lastName}
                style={styles.input}
              />
            </View>

            <View style={styles.boxInput}>
              <Dropdown selectGender={selectGender} />
            </View>

            <View style={styles.boxInput}>
              <Text style={{ padding: 10, color: "#fff" }}>Date de naissance</Text>
              <DatePickerWithModal
                select={selectBirthday}
                backgroundColor="rgba(255,255,255,0.1)"
              />
            </View>

            <View style={styles.boxInput}>
              <TextInput
                placeholder="Taille en cm"
                placeholderTextColor="rgba(255,255,255,0.7)"
                autoCapitalize="none"
                onChangeText={setHeight}
                value={height}
                style={styles.input}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.boxInput}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="rgba(255,255,255,0.7)"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                onChangeText={setEmail}
                value={email}
                style={styles.input}
              />
            </View>

            <View style={styles.boxInput}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                autoCapitalize="none"
                onChangeText={setPassword}
                value={password}
                style={styles.input}
                secureTextEntry={true}
              />
            </View>

            {errorMessage !== "" && (
              <Text style={styles.error}>{errorMessage}</Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.8}
              style={{ width: "100%" }}
            >
              <LinearGradient
                colors={["#A75DD8", "#6B3462"]}
                start={[0, 0]}
                end={[1, 1]}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>S'inscrire</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("SignIn")}
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryText}>
                Déjà un compte ? Connexion
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 5,
    marginTop: 15,
    textAlign: "center",
  },
  blurContainer: {
    width: "100%",
    borderRadius: 25, 
    overflow: "hidden", 
    backgroundColor: "rgba(255,255,255,0.1)", 
    padding: 20,
    marginVertical: 10,
  },
  formBlock: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  boxInput: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
  },
  input: {
    fontSize: 18,
    color: "#fff",
  },
  primaryButton: {
    borderRadius: 35,
    paddingVertical: 12,
    marginHorizontal: 12,
    alignItems: "center",
    marginVertical: 15,
    shadowColor: "#7A42C0",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1,
  },
  secondaryText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginVertical: 5,
  },
});
