import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('NewActivity')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Go to New Activity</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('List')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Vue Liste - Go to List</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Graphs')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>ici se place le graph - au clic : go to Graphs</Text>
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