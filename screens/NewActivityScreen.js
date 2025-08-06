import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function NewActivityScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Nouvelle Activité</Text>
      <View>
        <Text>Titre</Text>
        <TextInput></TextInput>
      </View>
      <View>
        <Text>Sport</Text>
        <TextInput></TextInput>
      </View>
      <View>
        <Text>Durée</Text>
        <TextInput></TextInput>
      </View>
      <View>
        <Text>Date</Text>
        <TextInput></TextInput>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('TabNavigator', {screen : 'Home'})} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Annuler - Go back to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TabNavigator', {screen : 'Home'})} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Enregistrer - Go back to Home</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#ec6e5b',
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});