import { StyleSheet, Text, View, ScrollView, TextInput, FlatList } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { useSelector } from 'react-redux';

export default function ListScreen({ navigation }) {

  const activities = useSelector((state) => state.activities.value);

  const renderItem = ({ item }) => {
    const { title, type, date } = item;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>Type : {type}</Text>
        <Text style={styles.detail}>Date : {date}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Mes Activités</Text>
      <View style={styles.h2}>
          <FontAwesome name='arrow-left' size={15} color='black' style={styles.arrow} />
          <View style={styles.h3}>
                <Text>Filtres</Text>
                <FontAwesome name='filter' size={15} color='black' style={styles.arrow} />
          </View>
      </View>
      <FlatList data={activities} keyExtractor={(item, index) => index.toString()} renderItem={renderItem} contentContainerStyle={styles.list}/>

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 70,
    marginLeft : 20,
    marginBottom: 30,
    color: 'black',
  },
  h2:{
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  h3:{
    flexDirection : 'row',
    marginRight : 20,
  },
  arrow:{
    marginLeft : 20,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    width : 330, 
    padding: 16,
    borderRadius: 8,
    borderBottomColor : 'red', 
    borderBottomWidth : 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  detail: {
    fontSize: 16,
    color: '#555',
  },
})

