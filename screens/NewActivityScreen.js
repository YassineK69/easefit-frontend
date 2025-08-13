import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ImageBackground, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from "react-redux";
import { addNewActivity} from '../reducers/activities';
import * as ImagePicker from 'expo-image-picker';

import Dropdown from "../components/sporttype";
import ActivityDateModal from "../components/activitydate";
import ActivityDurationModal from "../components/activityduration";

export default function NewActivityScreen({ navigation }) {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.token);

  const [activityTitle, setActivityTitle] = useState('');;
  const [activityDuration, setActivityDuration] = useState('');
  const [activityComment, setActivityComment] = useState('');
  const [activityType, setActivityType] = useState(null); 
  const [activityDate, setActivityDate] = useState(new Date()); 
  const [activityGrade, setActivityGrade] = useState(0);
  const [activityImageUri, setActivityImageUri] = useState(null);
  const [activityImageName, setActivityImageName] = useState(null);

      const resetForm = () => {
        setActivityTitle('');
        setActivityType('');
        setActivityDate(new Date());
        setActivityDuration(30);
        setActivityGrade('');
        setActivityComment('');
      };

  const handleGallery = async ()=> {

      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.status !== 'granted') {
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
  }

  const handleRegister =() => {

    if (!activityTitle || !activityType || !activityDuration || !activityDate || !activityGrade) {
      return
    } else {
      const formData = new FormData();
        formData.append("title", activityTitle);
        formData.append("type", activityType);
        formData.append("date", activityDate.toUTCString()); 
        formData.append("duration", activityDuration);
        formData.append("grade", activityGrade);
        formData.append("comment", activityComment);

      if(activityImageUri){
        formData.append("activitiesPic", {
          uri: activityImageUri,
          name: activityImageUri.split("/").pop(),
          type: "image/jpeg", 
        });
      }
        
        fetch(`${process.env.EXPO_PUBLIC_URL_VERCEL}/activities/newactivity/${token}`, {
            method: 'POST',
            body: formData,
          })     
          .then (response => response.json())
          .then(data => {
            if (data.result){
              dispatch(addNewActivity(data.newActivity));
              resetForm();
              navigation.navigate('TabNavigator', { screen: 'Home' });
            } else {
              console.error('Erreur lors de l’enregistrement');
            }
          })
      }
    }

    const handleStarPress = (index) => {
        setActivityGrade(index + 1); 
    };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ImageBackground source={require('../assets/fondnewactivity.jpg')} style ={styles.background}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

          <View>
            <Text style ={styles.title}>Nouvelle Activité</Text>

            <View style ={styles.input}>
              <Text style ={styles.prop}>Titre</Text>
              <TextInput placeholder='Activité du jour' placeholderTextColor="rgba(0,0,0,0.4)" style={styles.inputtitle} onChangeText={setActivityTitle} value={activityTitle} ></TextInput>
            </View>

            <View style ={[styles.input, {zIndex:10}]}>
              <Text style ={styles.prop}>Sport</Text>
              <Dropdown selectSportType={setActivityType} />
            </View>

            <View style ={styles.input}>
              <Text style ={styles.prop}>Durée</Text>
              <ActivityDurationModal selectActivityDuration={(value) => setActivityDuration(value)} />
            </View>

            <View style ={styles.input}>
              <Text style ={styles.prop}>Date</Text>
              <ActivityDateModal selectedDate={activityDate} selectActivityDate={setActivityDate}/>
            </View>

            <View style={styles.input}>
              <Text style={styles.prop}>Photos/Vidéos</Text>
              <View style={styles.upload}>
              <TouchableOpacity style={styles.fakeInput} onPress={() => handleGallery()} >
                <FontAwesome name='upload' size={25} color='black'/>
              </TouchableOpacity>
              {activityImageName && (<Text style={{ color: 'white', marginTop: 5 }}>{activityImageName}</Text>)}
              </View>
            </View>

            <View style={styles.inputwrapper}>
              <TextInput placeholder='Mes impressions' placeholderTextColor="rgba(0,0,0,0.4)" multiline={true} textAlignVertical="top" textAlign="left" scrollEnabled={true} style={styles.inputcomment} onChangeText={setActivityComment} value={activityComment} ></TextInput>
            </View>
            <View style={styles.grade}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
                <FontAwesome name={index < activityGrade ? 'star' : 'star-o'} size={30} color="white" style={styles.star}/>
              </TouchableOpacity>
              ))}
            </View>

            <View style={styles.btn}>
              <TouchableOpacity onPress={() => navigation.navigate('TabNavigator', {screen : 'Home'})} style={styles.button} activeOpacity={0.8}>
                  <Text style={styles.textButton}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {handleRegister()}} style={styles.button} activeOpacity={0.8}>
                  <Text style={styles.textButton}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          </View>

        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  background:{                          //OK
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  container: {                          //OK      
    flex: 1,
    alignItems: 'center',
  },
  title:{                               //OK
    fontSize: 35, 
    fontWeight : '600', 
    fontFamily: 'Manrope_700Bold',
    color : '#ffffff',
    textAlign : 'center',
    marginTop : 80,
    marginBottom : 30,
    letterSpacing : 2,
  }, 
  input:{
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems: 'center',
    marginBottom : 25,
    paddingHorizontal: 20,                //Change here

  }, 
  prop:{
    color: 'white', 
    fontSize : 16, 
    fontFamily: 'Manrope_600Regular',
    fontWeight : '600',
    width: 125,                           //Change here
  },
  inputtitle:{
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'Manrope_600Regular',
    fontWeight : '600',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '210',
    height: 40,
    paddingLeft : 12,
  },
  inputdate:{
    borderRadius: 5,
    fontSize: 16,
    fontFamily: 'Manrope_600Regular',
    fontWeight : '600',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '66%',
    height: 35,
    paddingLeft : 8,
    justifyContent: 'center',             //Change here
  }, 
  inputduration:{
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'Manrope_600Regular',
    fontWeight : '600',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '210',
    height: 40,
    paddingLeft : 12,
  },
  fakeInput: {
    height: 40,
    width: '210',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    paddingLeft: 12,
},
  grade:{
    flexDirection : 'row',
    justifyContent : 'center',
    marginTop: 20,
    marginBottom: 10,
  }, 
  star:{
    color :'white', 
    marginHorizontal: 8,              //Change here
  },
  inputwrapper:{
    width: 350,
    height: 140,
    maxHeight: 150,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: '#6B3462',
    borderWidth: 2,
    borderRadius: 5,
    overflow: 'hidden',
    padding: 10,  
    marginTop:15,                    //Change here
    marginBottom: 15,
  },
  inputcomment: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    textAlignVertical: 'top',
    textAlign: 'left',
  },
  btn:{                               //OK
    flexDirection : 'row',
    justifyContent : 'space-around',
    marginVertical: 30,
    paddingHorizontal: 20,              //Change here
  }, 
  button:{                            //OK
    backgroundColor : 'white',
    borderRadius : 8,
    width : 145,
    height : 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal : 5,
    borderColor : '#6B3462', 
    borderWidth : 1,
  }, 
  textButton:{                        //OK
    color: 'black', 
    fontSize : 20,
    fontWeight: '600',                  //Change here
  }, 
});
