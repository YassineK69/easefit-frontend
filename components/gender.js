import { useState, useEffect } from "react";
import { StyleSheet, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Dropdown = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Homme", value: "H" },
    { label: "Femme", value: "F" },
    { label: "Non renseigné", value: "N" },
  ]);

  useEffect(() => {
    props.selectGender(value);
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder="Sélectionner le genre"
      style={styles.dropdown}
      textStyle={styles.text}
      dropDownContainerStyle={styles.dropdownContainer}
      listItemContainerStyle={styles.listItem}
      selectedItemLabelStyle={styles.selectedItem}
      placeholderStyle={styles.placeholder}
      arrowIconStyle={{ tintColor: "#fff" }}
      tickIconStyle={{ tintColor: "#fff" }}
      zIndex={1000}
      zIndexInverse={1000}
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderColor: "transparent",
    borderRadius: 15,
    height: Platform.OS === "ios" ? 50 : 45,
  },
  text: {
    color: "#ffffffff",
    fontSize: 18,
  },
  dropdownContainer: {
    backgroundColor: "rgba(245, 109, 250, 1)", 
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 15,
    marginTop: 5,
  },
  listItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#aaa",
  },
  selectedItem: {
    fontWeight: "bold",
    color: "#A75DD8",
  },
  placeholder: {
    color: "rgba(255,255,255,0.7)",
  },
});
