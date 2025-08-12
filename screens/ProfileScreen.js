import { ImageBackground, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user';

export default function Profile({ navigation }) {
  const [userInfos, setUserInfos] = useState({});
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.token) {
      fetch(`${process.env.EXPO_PUBLIC_URL_VERCEL}/users/${user.token}`)
        .then(response => response.json())
        .then(data => {
          const Birthday = new Date(data.birthday);
          const date = Birthday.toLocaleDateString("fr-FR");

          setUserInfos({
            firstName: data.firstName || '',
            birthday: date || '',
            gender: data.gender || '',
            height: data.height || '',
            idActivities: data.idActivities || '',
          });
        });
    }
  }, [user.token]);

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace("SignIn");
  };

  return (
    <ImageBackground
      source={require("../assets/fond3.jpg")}
      style={styles.imageBackground}
      blurRadius={3} // moins flou pour fond plus visible
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={styles.profileCard}>
          <Image
            source={require("../assets/avatar.jpg")}
            style={styles.avatar}
          />
          <Text style={styles.name}>{userInfos.firstName}</Text>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nom :</Text>
              <Text style={styles.value}>{userInfos.firstName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Anniversaire :</Text>
              <Text style={styles.value}>{userInfos.birthday}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Genre :</Text>
              <Text style={styles.value}>{userInfos.gender}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Taille :</Text>
              <Text style={styles.value}>{userInfos.height} cm</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Activité :</Text>
              <Text style={styles.value}>{userInfos.idActivities}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)', // overlay moins sombre
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
    alignItems: "center",
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 25,
    borderWidth: 3,
    borderColor: "#4a90e2",
  },

  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 30,
    textTransform: "capitalize",
  },

  infoSection: {
    width: "100%",
    marginBottom: 40,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },

  label: {
    fontSize: 18,
    color: "#666",
    fontWeight: "600",
  },

  value: {
    fontSize: 18,
    color: "#222",
    fontWeight: "600",
    textTransform: "capitalize",
  },

  logoutButton: {
    backgroundColor: "#e94e4e",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: "#e94e4e",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  logoutText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
