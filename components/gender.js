import  { useState , useEffect } from "react";
import { StyleSheet } from "react-native";
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
      placeholder="Genre"
      style={styles.liste}
      textStyle={{
        color: "#000",
        fontSize: 16,
      }}
      dropDownContainerStyle={{
        flex:1,
        backgroundColor: "rgba(255,255,255,.9)",
        borderColor: "rgba(255,255,255,.8)",
        width:'60%',
        position:'absolute',
        margin:1,
        borderRadius:10,
        right:0,
      }}
      listItemContainerStyle={{
        borderBottomColor: "#444",
        borderBottomWidth: 0.5,
        color:"#fff",
      }}
      selectedItemLabelStyle={{
        fontWeight: "bold",
        color: "#d868c4",
      }}
      placeholderStyle={{
        color: "#000",
      }}
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  liste: {
    borderWidth: 0,
    color:'#000',
    backgroundColor: "rgba(255,255,255,0)",
  },
 
});
