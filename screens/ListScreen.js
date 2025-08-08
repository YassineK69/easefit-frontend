import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ListScreen({ navigation }) {
  const listData = [ { title: 'Bras', type: "Musculation", date: "30.07.2025" } ];

 const list = listData.map((data, i) => {
  return (
      <View key={i} style={styles.card}>
        <View style={styles.view}>
         <Text style={styles.textA}>{data.title}</Text>
         <Text style={styles.textA}>{data.date}</Text> 
        </View>
         <Text style={styles.textB}>{data.type}</Text>
      </View>
  )},
);
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Mes activités</Text>
        <TextInput style={styles.textInput}>Filtres</TextInput>
        <FontAwesome style={styles.filtre} name='heart-o' size={20} color='#000000ff' />
      </View>

    <ScrollView contentContainerStyle={styles.scrollView} style={styles.scrollMain}>
       {list}
     </ScrollView>
    </View>  
  )
};

const styles = StyleSheet.create({

  container: {
    flex : 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    width: "100%",
  },

  header: {
    paddingTop: 50,
    paddingRight: 10,
    paddingLeft: 15,
    height: '20%',
    width: '100%',
    borderBottomWidth : 3,
    backgroundColor: "darkred"
  },

  text: {
    fontSize: 30,
    color: "#FFF",
    paddingTop: 5,
    fontWeight: 'bold',
  },

  textInput: {
    paddingLeft: 280,
    fontSize: 20,
    fontWeight: 'bold',
    color: "#FFF",
  },

  card: {
    borderBottomWidth: 2,
    borderBottomColor: "darkred",
    width: "100%",
    flexDirection:"row",
    paddingTop : 25,
    paddingBottom: 20,
    justifyContent:"space-between"

  },

  filtre: {
    paddingLeft: 315,
    color: "#FFF",
  },

  textA: {
    fontSize : 20,
    fontWeight: 'bold',
    paddingLeft: 15,
  },

  textB: {
    fontSize : 18,
    fontWeight: 'bold',
    paddingTop: 17,
    paddingRight: 15
  },

  scrollView: {
    width : "100%",
    height: "100%",
  },

   view: {
    width : "50%",
    height: "100%",
  },

    scrollMain: {
    width : "85%",
    height: "100%",
  },

});