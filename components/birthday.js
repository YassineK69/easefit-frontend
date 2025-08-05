import  { useState , useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePickerWithModal = (props) => {
  const [date, setDate] = useState(new Date()); 
  const [showModal, setShowModal] = useState(false);

  const onChange = (event, selectedDate) => {
    if (selectedDate) setDate(selectedDate);
    if (Platform.OS === "android") setShowModal(false); // Android ferme automatiquement la modale
  };

  useEffect(() => {
    props.selectBirthday(date);
  }, [date]);

  const confirmIOSDate = () => setShowModal(false); // pour valider manuellement sur iOS

  return (
    <View>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <TextInput
          value={date.toLocaleDateString()}
          editable={false}
          placeholder="Birthday"
          pointerEvents="none"
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            borderColor: "#ccc",
          }}
        />
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "#00000077",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 16,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={onChange}
              style={{ backgroundColor: "white" }}
            />
            {Platform.OS === "ios" && (
              <Button title="Valider" onPress={confirmIOSDate} />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePickerWithModal;
