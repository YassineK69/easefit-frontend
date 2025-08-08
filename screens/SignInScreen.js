import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { loadActivities } from '../reducers/activities';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignInScreen({ navigation }) { 
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const goToHome = () => {
    if (!EMAIL_REGEX.test(signInEmail)) {
      setErrorMessage('Format email incorrect');
      return;
    } 

    fetch(`${process.env.EXPO_PUBLIC_URL_VERCEL}/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signInEmail, password: signInPassword }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log('data.activities:', data.activities);

          // Stocke le firstName en plus
          dispatch(login({ 
            email: signInEmail, 
            token: data.token,
            firstName: data.firstName || '', 
          }));

          dispatch(loadActivities(data.activities));

          setSignInEmail('');
          setSignInPassword('');
          navigation.navigate('TabNavigator', { screen: 'Home' });
        } else {
          setErrorMessage(data.error);
        }
      })
      .catch(err => {
        console.error('Erreur connexion:', err);
        setErrorMessage('Erreur de connexion');
      });
  };

  return (
    <ImageBackground source={require('../assets/fond2.png')} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Image style={styles.image} source={require('../assets/whitelogo.png')} />
        <Text style={styles.h1}>EASEFIT</Text>
        <View style={styles.input}>
          <TextInput 
            placeholder='Email' 
            placeholderTextColor="rgba(255,255,255,0.5)" 
            style={styles.inputbox} 
            onChangeText={setSignInEmail} 
            value={signInEmail} 
            autoCapitalize="none" 
            keyboardType="email-address" 
            textContentType="emailAddress" 
            autoComplete="email" 
          />
          <TextInput 
            placeholder='Mot de passe' 
            placeholderTextColor="rgba(255,255,255,0.5)" 
            style={styles.inputbox} 
            onChangeText={setSignInPassword} 
            value={signInPassword} 
            secureTextEntry
            autoCapitalize="none" 
          />
        </View>
        {errorMessage !== '' && <Text style={{ color: 'red', textAlign: 'center', marginVertical: 10 }}>{errorMessage}</Text>}
        <TouchableOpacity onPress={goToHome} style={styles.buttonToHome} activeOpacity={0.8}>
          <Text style={styles.textToHome}>Se connecter</Text>
        </TouchableOpacity>
        <View style={styles.goSignUp}>
          <Text style={styles.textSignUp}>Vous n'avez pas de compte ?</Text>
          <Text onPress={() => navigation.navigate('SignUp')} style={styles.textSignUpLink}> Inscrivez-vous</Text>
        </View>
        <View style={{height: 1, backgroundColor: 'gray', width: '100%', marginVertical: 10 }} />
        <View>
          <Text style={styles.sso}>SSO A VOIR APRES</Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({        
  background:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  container: {                            
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop : 45,
    width: 150,
    height: 150,
  }, 
  h1 :{
    fontSize : 50,
    fontWeight : '600',
    fontFamily: 'Manrope_700Bold',
    color : '#ffffff',
    textAlign : 'center',
    margin : 30,
    letterSpacing : 5,
  },
  input: {
    width: '90%',        
    alignItems: 'center', 
  },
  inputbox: {
    width: '90%',
    height: 50,   
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10, 
    color: 'white',
    fontSize: 20,
    fontFamily: 'Manrope_600Regular',
    fontWeight : '600',
    marginBottom: 25,
    opacity: 0.9,
    textAlignVertical: 'center', 
  },
  buttonToHome: {
    backgroundColor: '#6B3462',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 70,
    alignItems: 'center',
    marginVertical: 0,
    marginBottom : 20,
    marginTop : 10,
  },
  textToHome: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Manrope_700Bold',
    fontWeight : '600',
  },
  goSignUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    fontFamily: 'Manrope_400Regular',
    marginBottom : 10,
  },
  textSignUp:{
    color: 'white', 
    fontSize : 12,
  },
  textSignUpLink:{
    color:'white', 
    textDecorationLine: 'underline',
    fontSize : 12,
  },
  sso: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor : 'white',
    padding : 50,
    borderRadius : 10,
  },
});