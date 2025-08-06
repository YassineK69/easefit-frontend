import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function HomeScreen({ navigation, userName = 'Prénom' }) {
  const today = new Date().toISOString().split('T')[0];

  // Exemple d'activités avec date et sport
  const activities = [
    { date: '2025-08-10', sport: 'football' },
    { date: '2025-08-15', sport: 'tennis' },
    { date: '2025-08-15', sport: 'basketball' },
    { date: '2025-08-01', sport: 'football' },
    { date: '2025-07-28', sport: 'padel' },
  ];

  // Couleur par sport
  const sportColors = {
    football: '#3b82f6',    
    tennis: '#10b981',      
    basketball: '#f59e0b', 
    padel: '#b30bf5ff' 
  };

  // Construction dynamique de markedDates avec sélection du jour et dots
  const markedDates = {};

  // marquer today d'une pastille pleine
  markedDates[today] = { selected: true, selectedColor: '#5e2a84', dots: [] };

  activities.forEach(({ date, sport }) => {
    if (!markedDates[date]) {
      markedDates[date] = { dots: [] };
    }
    // Ajoute la pastille de la couleur du sport
    markedDates[date].dots.push({
      key: sport,
      color: sportColors[sport] || '#999999',
      selectedDotColor: sportColors[sport] || '#999999',
    });
  });

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello {userName}</Text>
          <Text style={styles.subTitle}>Vos activités</Text>
        </View>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => navigation.navigate('NewActivity')}
        >
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Vue liste */}
      <View style={styles.listViewContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('List')}>
          <Text style={styles.listViewText}>Vue liste ➤</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        height: 3,
        alignSelf: 'center',
        borderRadius: 3,
        marginTop: 15,
        backgroundColor: '#5e2a84',
        width: '70%',
        marginVertical: 10
      }} />

      {/* Calendrier intégré */}
      <View style={styles.calendarSection}>
        <Calendar
          current={today}
          markingType={'multi-dot'}
          markedDates={markedDates}
          onDayPress={(day) => {
            console.log('Selected day', day);
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#5e2a84ff',
            selectedDayBackgroundColor: '#84562aff', // ?
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#35df13', // ? 
            dayTextColor: '#000000ff',
            textDisabledColor: '#d9e1e8',
            arrowColor: '#5e2a84',
            monthTextColor: '#da341b',
            indicatorColor: '#2a8484ff', // ? 
            textDayFontSize: 10,
            textMonthFontSize: 14,
            textDayHeaderFontSize: 10,
            textMonthFontWeight: 'bold',
          }}
        />
      </View>

      <View style={{
        height: 3,
        alignSelf: 'center',
        borderRadius: 4,
        marginTop: 0,
        backgroundColor: '#5e2a84',
        width: '70%',
        marginVertical: 10
      }} />

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
  addButtonContainer: {
    backgroundColor: '#da341b',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    fontSize: 28,
    color: '#fff',
    lineHeight: 28,
  },
  listViewContainer: {
    alignItems: 'flex-end',
    marginBottom: 5,
    paddingRight: 20,
  },
  listViewText: {
    color: '#000000ff',
    fontSize: 14,
  },
  calendarSection: {
    marginTop: 0,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  monthTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 10,
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
