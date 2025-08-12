
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
  ImageBackground,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useSelector } from 'react-redux';
export default function HomeScreen({ navigation }) {
  const today = new Date().toISOString().split('T')[0];
  const token = useSelector((state) => state.user.value.token);
  const firstName = useSelector((state) => state.user.value.firstName);
  const allActivitiesRedux = useSelector((state) => state.activities.value);
  const [markedDates, setMarkedDates] = useState({});
  const [allActivities, setAllActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const sportColors = {
    Muscu: '#b30bf5',
    Course: '#3b82f6',
    Fitness: '#10b981',
  };
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_URL_VERCEL}/activities/calendar/${token}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
        const data = await response.json();
        if (data && data.activities) {
          formatAndSetCalendar(data.activities);
        }
      } catch (error) {
        console.error('Erreur de chargement des activités :', error);
      }
    };
    if (token) fetchActivities();
  }, [token, allActivitiesRedux]);
  const formatAndSetCalendar = (activities) => {
    const newMarkedDates = {};
    const formattedActivities = activities.map((act) => {
      const formattedDate = act.date.split('T')[0];
      const dotColor = sportColors[act.type] || '#999999';
      if (!newMarkedDates[formattedDate]) {
        // Une seule pastille par jour avec couleur de la première activité
        newMarkedDates[formattedDate] = {
          marked: true,
          dotColor: dotColor,
        };
      }
      // Sélectionne aujourd'hui
      if (formattedDate === today) {
        newMarkedDates[formattedDate] = {
          ...newMarkedDates[formattedDate],
          selected: true,
          selectedColor: '#7b46f6',
        };
      }
      return {
        date: formattedDate,
        title: act.title || 'Sans titre',
        duration: act.duration || 0,
        rating: act.grade || 0,
        description: act.comment || 'Pas de description',
        type: act.type || '',
      };
    });
    if (!newMarkedDates[today]) {
      newMarkedDates[today] = {
        selected: true,
        selectedColor: '#7b46f6',
      };
    }
    setMarkedDates(newMarkedDates);
    setAllActivities(formattedActivities);
  };
  const handleDayPress = (day) => {
    const clickedDate = day.dateString;
    const activity = allActivities.find((act) => act.date === clickedDate);
    if (activity) {
      setSelectedActivity(activity);
      setModalVisible(true);
    } else {
      setSelectedActivity(null);
      setModalVisible(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            👋 Hello {firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : "!"} !
          </Text>
          <Text style={styles.subTitle}>Vos activités</Text>
        </View>
        <TouchableOpacity
          style={styles.addButtonContainer}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('NewActivity')}
        >
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>
      {/* LIST VIEW BUTTON */}
      <View style={styles.listViewContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('List')}>
          <Text style={styles.listViewText}>Vue liste ➤</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      {/* CALENDAR */}
      <View style={styles.calendarSection}>
        <Calendar
          current={today}
          markedDates={markedDates}
          onDayPress={handleDayPress}
          theme={{
            backgroundColor: '#fafafa',
            calendarBackground: '#fafafa',
            textSectionTitleColor: '#7b46f6',
            selectedDayBackgroundColor: '#7b46f6',
            selectedDayTextColor: '#fff',
            todayTextColor: '#50cebb',
            dayTextColor: '#333',
            textDisabledColor: '#d9e1e8',
            arrowColor: '#7b46f6',
            monthTextColor: '#7b46f6',
            indicatorColor: '#7b46f6',
            textDayFontSize: 14,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
            textMonthFontWeight: '700',
          }}
          style={styles.calendar}
        />
      </View>
      <View style={styles.divider} />
      {/* GRAPH PLACEHOLDER */}
      <Text style={styles.monthTitle}>Ce dernier mois</Text>
      <TouchableOpacity
        style={styles.chartContainer}
        onPress={() => navigation.navigate('Graphs')}
        activeOpacity={0.8}
      >
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>[ Graphique ici (API) ]</Text>
        </View>
      </TouchableOpacity>
      {/* MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>
                {selectedActivity?.title?.toUpperCase()}
              </Text>
            </View>
            <ImageBackground
              source={require('../assets/art-8504670_1280.png')}
              style={styles.modalImageBackground}
              imageStyle={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, opacity: 0.9 }}
            >
              <View style={styles.modalTopRow}>
                <Text style={styles.modalDuration}>
                  {selectedActivity?.duration} MIN
                </Text>
                <View style={styles.starContainer}>
                  {[...Array(5)].map((_, i) => (
                    <Text key={i} style={styles.star}>
                      {i < selectedActivity?.rating ? '★' : '☆'}
                    </Text>
                  ))}
                </View>
              </View>
            </ImageBackground>
            <View style={styles.modalContent}>
              <Text style={styles.modalDescription}>
                {selectedActivity?.description}
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && { opacity: 0.7 },
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: {
    marginTop: 30,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(123, 70, 246, 0.1)',
    paddingVertical: 15,
    borderRadius: 15,
    marginHorizontal: 16,
    shadowColor: '#7b46f6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  greeting: { fontSize: 26, fontWeight: '800', color: '#5e2a84' },
  subTitle: {
    fontSize: 16,
    color: '#5e2a84',
    fontWeight: '600',
    marginTop: 4,
  },
  addButtonContainer: {
    backgroundColor: '#7b46f6',
    borderRadius: 25,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7b46f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  addButton: { fontSize: 34, color: '#fff', lineHeight: 34 },
  listViewContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
    paddingRight: 24,
  },
  listViewText: {
    color: '#7b46f6',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  divider: {
    height: 3,
    alignSelf: 'center',
    borderRadius: 4,
    backgroundColor: '#7b46f6',
    width: '75%',
    marginVertical: 15,
    shadowColor: '#7b46f6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  calendarSection: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  calendar: {
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  monthTitle: {
    fontSize: 19,
    fontWeight: '700',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    color: '#5e2a84',
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  placeholderBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  placeholderText: { color: '#bbb', fontStyle: 'italic', fontSize: 15 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#7b46f6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 15,
  },
  modalHeader: {
    backgroundColor: '#7b46f6',
    paddingVertical: 18,
    paddingHorizontal: 15,
  },
  modalHeaderTitle: {
    fontWeight: '700',
    fontSize: 24,
    color: '#fff',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  modalImageBackground: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  modalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalDuration: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  starContainer: { flexDirection: 'row' },
  star: { fontSize: 20, color: '#fff', marginHorizontal: 1 },
  modalContent: {
    backgroundColor: '#f5f3ff',
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  modalDescription: {
    color: '#3c365d',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  closeButton: {
    marginTop: 25,
    backgroundColor: '#7b46f6',
    paddingVertical: 13,
    borderRadius: 15,
    shadowColor: '#7b46f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});
