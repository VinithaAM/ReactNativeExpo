import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
  Platform,
  Button,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenType } from "./StackNavigation";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AddNewItem, MasterHistoryData } from "../Services/CommonService";
import RNDateTimePicker from "@react-native-community/datetimepicker";

type typeprop = NativeStackScreenProps<ScreenType, "AddNew">;
function AddNewPage(prop: typeprop) {
  const { navigation } = prop;

  const renderItem = (item: any) => {
    return (
      <View style={style.item}>
        <Text style={style.textItem}>{item.historyId}</Text>
        {item.value === value && (
          <AntDesign style={style.icon} color="black" name="Safety" size={20} />
        )}
      </View>
    );
  };
  const oncancelhandle = () => {
    navigation.navigate("FlatListPage");
  };
  const [historyId, sethistoryId] = useState("");
  const [timeStamp, settimeStamp] = useState("");
  const [correctionValue, setcorrectionValue] = useState("");
  const [status, setstatus] = useState("");
  const [value, setValue] = useState("");
  const [masterValue, setMasterValue] = useState([]);
  const [showDatePick, setShowDatePicker] = useState(false);
  function handleClear() {
    sethistoryId("");
    settimeStamp("");
    setcorrectionValue("");
    setstatus("");
  }
  function onChangeStatus(e: any) {
    const regex = /^[a-zA-Z]*$/;
    if (regex.test(e) || e === "") {
      setstatus(e);
    }
  }
  function onChangeValue(e: any) {
    const regex = /^[0-9]*$/;
    if (regex.test(e) || e === "") {
      setcorrectionValue(e);
    }
    //setcorrectionValue(e);
  }
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentdate = selectedDate;
      //setDate(currentdate);
      settimeStamp(currentdate);
      if (Platform.OS === "android") {
        settimeStamp(currentdate);
      }
      showDatePicker();
    } else {
      showDatePicker();
    }
  };
  const onSaveFunction = () => {
    let params = {
      id: 0,
      historyId: historyId,
      timeStamp: timeStamp,
      value: correctionValue,
      statusTags: status,
      correctedValue: correctionValue,
      createdBy: 1,
    };
    if (historyId != "" && correctionValue != "" && status != "") {
      try {
        AddNewItem(params)
          .then((result: any) => {
            if (result.data != null) {
              navigation.navigate("FlatListPage");
            }
          })
          .catch((error: any) => {
            console.log("Error occurred", error);
            navigation.navigate("LoginPage");
          });
      } catch (error) {
        console.log("Error occured", error);
        navigation.navigate("LoginPage");
      }
    } else {
      alert("Please Fill the form");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      masterDatafetch();
    }, 5000);
  }, []);
  const masterDatafetch = () => {
    MasterHistoryData().then((result) => {
      setMasterValue(result.data.data);
    });
  };
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
      settimeStamp(selectedDate);
      // Perform any actions with the selected date
    }
  };
  return (
    <>
      <View style={style.container}>
        <Text style={style.textTitle}>Add New Details</Text>
        <View style={style.insideContainer}>
          <Text style={style.inputTitle}>HistoryName</Text>
          <Dropdown
            style={style.dropdown}
            placeholderStyle={style.placeholderStyle}
            selectedTextStyle={style.selectedTextStyle}
            inputSearchStyle={style.inputSearchStyle}
            iconStyle={style.iconStyle}
            data={masterValue}
            search
            maxHeight={300}
            labelField="historyId"
            valueField="historyId"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={historyId}
            onChange={(item) => {
              sethistoryId(item.historyId);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={style.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
            renderItem={renderItem}
          ></Dropdown>
        </View>
        <View style={style.insideContainer}>
          <Text style={style.inputTitle}>StatusTag</Text>
          <TextInput
            placeholder="Enter the Status"
            style={style.textInput}
            value={status}
            onChangeText={onChangeStatus}
            maxLength={15}
          ></TextInput>
        </View>
        <View style={style.insideContainer}>
          <Text style={style.inputTitle}>Correction</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Enter the Correction Value"
            style={style.textInput}
            value={correctionValue}
            onChangeText={onChangeValue}
            maxLength={8}
          ></TextInput>
        </View>
        <View style={style.insideContainer}>
          <Text style={style.inputTitle}>TimeStamp </Text>
          <Pressable onPress={() => setShowDatePicker(true)}>
            <Text style={style.Datepicker}>Select TimeStamp</Text>
          </Pressable>
          {showDatePick && (
            <RNDateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={onChangeDate}
            />
          )}
        </View>

        <View style={style.styleView}>
          <TouchableOpacity
            style={[style.buttonLogin, style.customButton]}
            onPress={onSaveFunction}
          >
            <Text style={{ color: "#fff" }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.buttonClear, style.customButton]}
            onPress={handleClear}
          >
            <Text style={{ color: "#fff" }}> Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.buttonCancel, style.customButton]}
            onPress={oncancelhandle}
          >
            <Text style={{ color: "#fff" }}> Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const width = Dimensions.get("window").width - 70;
const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 2,
    borderColor: "blue",
    width: 200,
    height: 40,
    borderRadius: 15,
    paddingLeft: 15,
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 10,
    marginLeft: 40,
    justifyContent: "flex-end",
  },
  inputTitle: {
    paddingLeft: 20,
    // opacity: 0.5,
    color: "black",
    fontWeight: "bold",
    fontFamily: "serif",
    fontSize: 15,
    marginRight: 15,
    //marginLeft: 30,
    // justifyContent: "center",
    // alignItems: "baseline",
  },
  styleView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputarea: {
    flexDirection: "column",
  },
  buttonCancel: {
    backgroundColor: "#147EFB",
    textAlign: "center",
  },
  customButton: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 1,
    marginRight: 8,
    borderColor: "blue",
  },
  insideContainer: {
    flexDirection: "row",
    textAlign: "left",
    width: width,
  },
  buttonLogin: {
    backgroundColor: "#69f58e",
    textAlign: "center",
  },
  buttonClear: {
    backgroundColor: "#131413",
    textAlign: "center",
  },
  textTitle: {
    color: "black",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontSize: 25,
    textAlign: "center",
    margin: 15,
  },
  dropdown: {
    margin: 10,
    height: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    width: 200,
    // marginLeft: 70,
    marginRight: 80,
    marginLeft: 20,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: "lightgray",
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 11,
  },
  Datepicker: {
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "blue",
    backgroundColor: "grey",
    marginRight: 100,
    marginLeft: 40,
    width: 150,
    alignContent: "center",
    justifyContent: "center",
    //paddingLeft: 15,
  },
  dropdownTitle: {
    alignSelf: "flex-start",
    //paddingLeft: 30,
    marginBottom: 5,
    opacity: 0.5,
    color: "black",
    fontWeight: "bold",
    fontFamily: "serif",
    fontSize: 15,
    borderColor: "blue",
    //marginRight: 100,
    marginLeft: 50,
    textAlign: "center",
  },
});
export default AddNewPage;
