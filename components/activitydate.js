import  { useState } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput, Modal, Platform, Button} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const ActivityDateModal = ({ selectedDate, selectActivityDate }) => {
  const [showModal, setShowModal] = useState(false);

  const onChange = (event, selected) => {
    if (selected) {
      selectActivityDate(selected); 
    }
    if (Platform.OS === "android") setShowModal(false);
  };

  const confirmIOSDate = () => setShowModal(false); // pour valider manuellement sur iOS

  return (
    <View>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <TextInput value={selectedDate ? selectedDate.toLocaleDateString() : ''} editable={false} placeholder="Date de l'activité" pointerEvents="none" style= {[styles.input,{ color: 'black'}]} placeholderTextColor="rgba(0,0,0,0.4)"/> 
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={{flex: 1, justifyContent: "flex-end", backgroundColor: "#00000077"}}>
          <View
            style={{backgroundColor: "white", padding: 16, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            <DateTimePicker value={selectedDate || new Date()} mode="date" display="spinner" onChange={onChange} style={{ backgroundColor: "white" }}/>
            {Platform.OS === "ios" && (
              <Button title="Valider" onPress={confirmIOSDate} />
            )}
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
})

export default ActivityDateModal;

