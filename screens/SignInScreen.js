import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SignInScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('TabNavigator', {screen : 'Home'})} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Se Connecter - go to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Go to Signup</Text>
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