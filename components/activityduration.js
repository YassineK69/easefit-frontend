import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Platform, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const ActivityDurationModal = (props) => {
  const [duration, setDuration] = useState(30); 
  const [showModal, setShowModal] = useState(false);
  const [tempDuration, setTempDuration] = useState(30); 

  useEffect(() => {
    props.selectActivityDuration(duration);
  }, [duration]);

  const confirmDuration = () => {
    setDuration(tempDuration);
    setShowModal(false);
  };

return (
    <View>

      <TouchableOpacity onPress={() => setShowModal(true)}>
        <TextInput value={duration ? `${duration} min` : ''} editable={false} placeholder="Exemple: 60" pointerEvents="none" style={[styles.input, { color: duration ? 'black' : 'rgba(0,0,0,0.4)' }]} placeholderTextColor="rgba(0,0,0,0.4)"/>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">

        <View style={styles.modalBackground}>

          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choisissez une durée</Text>
            <Picker selectedValue={tempDuration} onValueChange={(itemValue) => setTempDuration(itemValue)} style={styles.picker}>
              {[...Array(121).keys()].map((min) => (
                <Picker.Item key={min} label={`${min} min`} value={min} />
              ))}
            </Picker>
            <Button title="Valider" onPress={confirmDuration} />
          </View>

        </View>

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 40,
    width: 220,
    paddingLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000077',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  picker: {
    height: 150,
    backgroundColor: 'white',
  },
});

export default ActivityDurationModal;

