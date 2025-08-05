import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import App from '../App';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello Prénom</Text>
          <Text style={styles.subTitle}>Vos activités</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('NewActivity')}>
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Vue liste */}
      <View style={styles.listViewContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('List')}>
          <Text style={styles.listViewText}>Vue liste ➤</Text>
        </TouchableOpacity>
      </View>

<View style={{height: 1, alignSelf:'center', height: 3, borderRadius: 3, marginTop: 30, backgroundColor: '#5e2a84', width: '70%', marginVertical: 10 }} />

      {/* Placeholder Calendrier */}
      <View style={styles.calendarSection}>
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>[ Calendrier ici (API) ]</Text>
        </View>
      </View>

<View style={{height: 1, alignSelf:'center', borderRadius: 4, height: 3, marginTop: 10, backgroundColor: '#5e2a84', width: '70%', marginVertical: 10 }} />

      {/* Placeholder Graphique */}
      <Text style={styles.monthTitle}>Ce dernier mois</Text>
      <TouchableOpacity
        style={styles.chartContainer}
        onPress={() => navigation.navigate('Graphs')}
      >
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>[ Graphique ici (API) ]</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5e2a84',
  },
  subTitle: {
    fontSize: 16,
    color: '#5e2a84',
    fontWeight: 'bold',
    marginTop: 4,
  },
  addButton: {
    fontSize: 32,
    color: '#5e2a84',
  },
  calendarSection: {
    marginTop: 20,
    marginBottom:20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  listViewContainer: {
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  listViewText: {
    color: '#000000ff',
    fontSize: 14,
  },
  monthTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
    marginBottom:15,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    backgroundColor: '#7333a0ff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
 placeholderBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  placeholderText: {
    color: '#999',
    fontStyle: 'italic',
  },

});
