import  { useState , useEffect } from "react";
import { StyleSheet,  View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Dropdown = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Muscu", value: "Muscu" },
    { label: "Course", value: "Course" },
    { label: "Fitness", value: "Fitness" },
  ]);
  
  useEffect(() => {
    props.selectSportType(value);
  }, [value]);

  return (
    <View style={styles.wrapper}>
        <DropDownPicker open={open} value={value} items={items} setOpen={setOpen} setValue={setValue} setItems={setItems} placeholder="Course"
        style={styles.dropdown} textStyle={styles.text} dropDownContainerStyle={styles.dropdownContainer} placeholderStyle={styles.placeholder}/>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 220,
    height: 40,
    zIndex: 1000,
  },
  dropdown: {
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderColor: '#ccc',
    height: 40,
    paddingLeft: 8,
  },
  dropdownContainer: {
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderColor: '#ccc',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    lineHeight: 35,
  },
  placeholder: {
    color: 'rgba(0,0,0,0.4)',
  },
});

export default Dropdown;





