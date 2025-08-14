import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadActivities } from '../reducers/activities';
import { login } from '../reducers/user';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignInScreen({ navigation }) {
  const [signInEmail, setSignInEmail] = useState('test@gmail.com');
  const [signInPassword, setSignInPassword] = useState('test');
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
    <ImageBackground
      source={require('../assets/images/abstrait-fond-sombre-avec-des-vagues-colorees-qui-coule.jpg')}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Bloc Logo + Titre */}
        <View style={styles.logoBlock}>
          <BlurView intensity={60} tint="dark" style={styles.logoWrapper}>
            <LinearGradient
              colors={['rgba(167,93,216,0.6)', 'rgba(107,52,98,0.6)']}
              start={[0, 0]}
              end={[1, 1]}
              style={styles.logoGradient}
            >
              <Image style={styles.image} source={require('../assets/logo3_cropped.png')} />
            </LinearGradient>
          </BlurView>
          <Text style={styles.h1}>EASEFIT</Text>
        </View>

        {/* Bloc Formulaire */}
        <View style={styles.formBlock}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Email'
              placeholderTextColor="rgba(255,255,255,0.6)"
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
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={styles.inputbox}
              onChangeText={setSignInPassword}
              value={signInPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {errorMessage !== '' && (
            <Text style={styles.error}>{errorMessage}</Text>
          )}

          {/* Bouton Se connecter avec largeur réduite */}
          <TouchableOpacity onPress={goToHome} activeOpacity={0.85} style={{ alignSelf: 'center' }}>
            <LinearGradient
              colors={['#A75DD8', '#6B3462']}
              start={[0, 0]}
              end={[1, 1]}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Se connecter</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.goSignUp}>
            <Text style={styles.textSignUp}>Pas de compte ?</Text>
            <Text onPress={() => navigation.navigate('SignUp')} style={styles.textSignUpLink}> Inscrivez-vous</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
    paddingHorizontal: 20,
    marginBottom: 70,
  },
  logoBlock: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoWrapper: {
    borderRadius: 35,
    overflow: 'hidden',
    shadowColor: '#7A42C0',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  logoGradient: {
    borderRadius: 35,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 130,
    resizeMode: 'contain',
  },
  h1: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 4,
    fontFamily: 'Manrope_700Bold',
    marginTop: 5, 
  },
  formBlock: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  inputContainer: {
    width: '100%',
    gap: 15,
  },
  inputbox: {
    width: '100%',
    height: 55,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  primaryButton: {
    borderRadius: 35,
    paddingVertical: 12,
    paddingHorizontal: 80,
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#7A42C0',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  goSignUp: {
    flexDirection: 'row',
  },
  textSignUp: {
    color: 'white',
    fontSize: 14,
  },
  textSignUpLink: {
    color: 'white',
    textDecorationLine: 'underline',
    fontSize: 14,
    marginLeft: 5,
  },
});
