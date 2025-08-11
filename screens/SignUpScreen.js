import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView
} from "react-native";
import { useState } from "react";
import Dropdown from "../components/gender";
import DatePickerWithModal from "../components/SelectDate";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

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

  const selectGender = (value) => {
    setGender(value);
  };
  const selectBirthday = (value) => {
    setBirthday(value);
  };

  const handleSubmit = () => {
    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage("Format email incorrect");
      return;
    }
    const dataUser = {
      email: email,
      password: password,
      lastName: lastName,
      firstName: firstName,
      gender: gender,
      birthday: birthday,
      height: height,
    };
    
    fetch( `${process.env.EXPO_PUBLIC_URL_VERCEL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ email: email, token: data.token }));
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
      source={require("../assets/fond1.jpg")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
          <Text style={{ color: "#fff", fontSize: 40, marginTop: 15 }}>
            Inscription
          </Text>
          <View style={{ borderWidth: 0, borderColor: "#fff" }}>
            <View style={styles.boxInput}>
              <TextInput
                placeholder="Prénom : "
                autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
                onChangeText={(value) => setFirstName(value)}
                value={firstName}
                style={styles.input}
              />
            </View>
            <View style={styles.boxInput}>
              <TextInput
                placeholder="Nom : "
                autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
                onChangeText={(value) => setLastName(value)}
                value={lastName}
                style={styles.input}
              />
            </View>
            <View style={styles.boxInput}>
              <Dropdown selectGender={selectGender} />
            </View>
            <View style={styles.boxInput}>
              <Text style={{ padding: 10 }}>Birthday</Text>
              <DatePickerWithModal select={selectBirthday} backgroundColor='rgba(255, 255, 255, 0.1)'/>
            </View>
            <View style={styles.boxInput}>
              <TextInput
                placeholder="Taille en cm : "
                autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
                onChangeText={(value) => setHeight(value)}
                value={height}
                style={styles.input}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.boxInput}>
              <TextInput
                placeholder="Email : "
                autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
                keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
                textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
                autoComplete="email" // https://reactnative.dev/docs/textinput#autocomplete-android
                onChangeText={(value) => setEmail(value)}
                value={email}
                style={styles.input}
              />
            </View>
            <View style={styles.boxInput}>
              <TextInput
                placeholder="Password : "
                autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
                onChangeText={(value) => setPassword(value)}
                value={password}
                style={styles.input}
                secureTextEntry={true}
              />
            </View>
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
          </View>
          <View
            style={{
              borderWidth: 0,
              borderColor: "#fff",
              width: "80%",
              marginTop: 20,
              margin:'auto',
            }}
          >
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>S'inscrire</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("SignIn")}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Annuler</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sso}>
            <Text>SSO A VOIR APRES</Text>
          </View>
        
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    borderColor: "red",
    borderWidth: 0,
  },

  container: {
    flex: 1,
    alignItems: "center",
    borderColor: "red",
    borderWidth: 0,
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    backgroundColor: "#6b3462",
    borderRadius: 10,
    margin: 10,
    width:'100%'
  },
  textButton: {
    height: 30,
    fontWeight: "400",
    fontSize: 20,
    color: "#fff",
  },
  input: {
    width: "100%",
    fontSize: 16,
    color: "#000",
  },
  boxInput: {
    borderColor: "#fff",
    borderWidth: 0,
    backgroundColor: "rgba(255,255,255,.8)",
    borderRadius: 20,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  sso: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 50,
    borderRadius: 10,
  },
});
