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
      source={require("../assets/images/fond-abstrait-3d.jpg")}
      style={styles.imageBackground}
      blurRadius={4} //  flou pour fond plus visible
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={styles.profileCard}>
          <Image
            source={require("../assets/images/l-illustration-de-l-arbre-de-l-anime.jpg")}
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
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  profileCard: {
    backgroundColor: 'rgba(57, 11, 109, 0.27)',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: "center",
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },

  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
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
    borderBottomColor: 'rgba(255,255,255,0.3)',
    paddingBottom: 10,
  },

  label: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },

  value: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    textTransform: "capitalize",
  },

  logoutButton: {
    backgroundColor: '',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DA341B',
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
