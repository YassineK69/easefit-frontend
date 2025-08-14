import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";

const DatePickerWithModal = (props) => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const onChange = (event, selectedDate) => {
    if (selectedDate) setDate(selectedDate);
    if (Platform.OS === "android") setShowModal(false);
  };

  useEffect(() => {
    props.select(date);
  }, [date]);

  const confirmIOSDate = () => setShowModal(false);
  const backgroundColor = props.backgroundColor || "rgba(255,255,255,0.15)";

  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity onPress={() => setShowModal(true)} activeOpacity={0.8}>
        <TextInput
          value={date.toLocaleDateString()}
          editable={false}
          pointerEvents="none"
          style={{
            padding: 14,
            borderRadius: 15,
            backgroundColor,
            color: "#fff",
            fontSize: 16,
            letterSpacing: 0.5,
          }}
        />
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <View
            style={{
              backgroundColor: "#1e1e2e",
              padding: 20,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, marginBottom: 10 }}>
              Sélectionner une date
            </Text>

            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              textColor="#fff"
              onChange={onChange}
              style={{ backgroundColor: "transparent" }}
            />

            {Platform.OS === "ios" && (
              <TouchableOpacity
                onPress={confirmIOSDate}
                activeOpacity={0.8}
                style={{ marginTop: 20, width: "100%" }}
              >
                <LinearGradient
                  colors={["#A75DD8", "#6B3462"]}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={{
                    paddingVertical: 14,
                    borderRadius: 30,
                    alignItems: "center",
                    shadowColor: "#7A42C0",
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 4 },
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                    Valider
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePickerWithModal;
