import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Button,
  Platform,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { ScreenType } from "./StackNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  MasterHistoryData,
  deleteCorrection,
  getHistoryCorrection,
  updateCorrectionDetails,
} from "../Services/CommonService";
import { useFocusEffect } from "@react-navigation/native";
import { format } from "date-fns";
import CommonGrid from "../Components/CommonGrid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Sample from "./Sample";

type Proptype = NativeStackScreenProps<ScreenType, "FlatListPage">;
function DataCorrectionListPage(prop: Proptype) {
  const { navigation } = prop;
  const [CorrectionData, setCorrectionData] = useState();
  const [columns, setColumns] = useState(1);
  const [ListData, setListData] = useState([]);
  const getHistoryData = () => {
    try {
      getHistoryCorrection()
        .then((result: any) => {
          if (result.data.status == "Success") {
            setListData(result.data.data);
          }
        })
        .catch((error: any) => {
          console.log("Error occurred", error);
          navigation.navigate("LoginPage");
        });
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handletoken();
    }, 5000);
  }, []);
  useFocusEffect(
    useCallback(() => {
      getHistoryData();
    }, [])
  );
  const handletoken = async () => {
    getHistoryData();
  };
  function renderItems(e: any) {
    return (
      <>
        {/* <CommonGrid title={e.item}></CommonGrid> */}
        <View style={[style.gridItem, { backgroundColor: "lightpink" }]}>
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => [
              style.button,
              pressed ? style.buttonPressed : null,
            ]}
            onPress={() => showModal(e.item)}
          >
            <View style={style.innerContainer}>
              <View style={style.bodycontainer}>
                <Text style={style.title}>{e.item.historyId} </Text>
                <AntDesign
                  name={viewModalVisible ? "downcircle" : "rightcircle"}
                  size={24}
                  color="black"
                />
              </View>
            </View>
          </Pressable>
        </View>
      </>
    );
  }
  const keyExtractor = (item: { id: number }) => {
    return item.id.toString();
  };
  function handlePress() {
    navigation.navigate("AddNew");
  }

  const [selectedItem, setSelectedItem] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [historyId, sethistoryId] = useState("");
  const [timeStamp, settimeStamp] = useState("");
  const [correctionValue, setcorrectionValue] = useState(0);
  const [status, setstatus] = useState("");
  const [value, setValue] = useState("");
  const [masterValue, setMasterValue] = useState([]);
  const [showDatePick, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [deleteModelVisible, setDeleteModelVisible] = useState(false);

  const renderItemmaster = (item: any) => {
    return (
      <View style={style.item}>
        <Text style={style.textItem}>{item.historyId}</Text>
        {item.value === value && (
          <AntDesign style={style.icon} color="black" name="Safety" size={20} />
        )}
      </View>
    );
  };

  const showModal = (item) => {
    setViewModalVisible(true);
    setSelectedItem(item);
    setViewModalVisible(true);
    settimeStamp(item.timeStamp);
  };

  const hideModal = () => {
    setViewModalVisible(false);
    getHistoryData();
  };
  const hideEditModal = () => {
    setEditModalVisible(false);
  };
  const onClickEdit = (item) => {
    setEditModalVisible(true);
    masterDatafetch();
    sethistoryId(item.historyId);
    settimeStamp(item.timeStamp);
    setDate(new Date(item.timeStamp));
    setstatus(item.statusTags);
    setcorrectionValue(item.correctedValue);
  };
  function onChangeStatus(e: any) {
    const regex = /^[a-zA-Z]*$/;
    if (regex.test(e) || e === "") {
      setstatus(e);
    }
  }
  function onChangeValue(e: any) {
    setcorrectionValue(e);
  }
  const masterDatafetch = () => {
    MasterHistoryData().then((result) => {
      setMasterValue(result.data.data);
    });
  };
  const onChangeDate = (event, selectedDate) => {
    var newDate = new Date(selectedDate);
    setShowDatePicker(Platform.OS === "ios");
    if (newDate) {
      //setDate(selectedDate);
      // var date = formatDate(newDate);
      settimeStamp(selectedDate);
      setDate(selectedDate);
    }
  };
  // const formatDate = (date) => {
  //   const parsedDate = new Date(date);
  //   var formattedDate: string;
  //   if (parsedDate) {
  //     formattedDate = format(parsedDate, "dd/MM/yyyy HH:mm");
  //   }
  //   // const formattedDate = format(parsedDate, "dd/MM/yyyy HH:mm");
  //   return formattedDate; // Or use any date formatting method you prefer
  // };
  const onUpdateDetails = (item) => {
    let params = {
      id: item.id,
      historyId: historyId,
      timeStamp: timeStamp,
      value: correctionValue,
      statusTags: status,
      correctedValue: correctionValue,
      createdBy: item.createdBy,
      dateCreated: item.dateCreated,
      lastModifiedBy: 1,
      dateModified: new Date(),
    };
    try {
      updateCorrectionDetails(params)
        .then((result: any) => {
          if (result.data.status == "Success") {
            alert("Update SuccessFully");
            setSelectedItem(result.data.data);
            setEditModalVisible(false);
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
  };
  const onConfirm = (e) => {
    try {
      deleteCorrection(e.id)
        .then((result: any) => {
          if (result.data.status == "Success") {
            alert("Deleted Successfully");
            setViewModalVisible(false);
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
  };
  const onClickDelete = (item) => {
    setDeleteModelVisible(true);
  };
  const onHandleSignout = () => {
    AsyncStorage.clear();
    navigation.navigate("LoginPage");
  };
  const onHandleClick = (e) => {
    //navigation.navigate("NewPage");
    <Sample title={e.item}></Sample>;
  };
  return (
    <>
      <Pressable style={style.newButton} onPress={handlePress}>
        <Text>Add New</Text>
      </Pressable>
      <View style={style.container}>
        <FlatList
          style={style.List}
          data={ListData}
          keyExtractor={keyExtractor}
          renderItem={renderItems}
          numColumns={columns}
          key={columns}
        ></FlatList>
      </View>
      <Modal
        animationIn="slideInUp"
        // transparent={true}
        isVisible={viewModalVisible}
        onModalHide={hideModal}
      >
        <View style={style.viewModalView}>
          {selectedItem && (
            <>
              <View style={{ backgroundColor: "White" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "darkblue",
                    fontSize: 20,
                  }}
                >
                  History Data Details
                </Text>
                <View style={style.textContainer}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 12,
                    }}
                  >
                    MasterName :
                  </Text>
                  <Text> {selectedItem.historyId} </Text>
                </View>
                <View style={style.textContainer}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 12,
                    }}
                  >
                    TimeStamp :
                  </Text>
                  <Text>
                    {format(
                      new Date(selectedItem.timeStamp),
                      "dd/MM/yyyy HH:mm"
                    )}
                  </Text>
                </View>
                <View style={style.textContainer}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 12,
                    }}
                  >
                    Status :
                  </Text>
                  <Text> {selectedItem.statusTags}</Text>
                </View>
                <View style={style.textContainer}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 12,
                    }}
                  >
                    Value :
                  </Text>
                  <Text> {selectedItem.correctedValue}</Text>
                </View>
              </View>
              <View style={style.buttonContainer}>
                <Pressable
                  style={[style.buttonClear, style.customButton]}
                  onPress={hideModal}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Close
                  </Text>
                </Pressable>
                <TouchableOpacity
                  style={[style.buttonLogin, style.customButton]}
                  onPress={() => onClickEdit(selectedItem)}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[style.buttonDelete, style.customButton]}
                  onPress={() => onClickDelete(selectedItem)}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Modal>
      <Modal animationIn="slideInUp" isVisible={editModalVisible}>
        <View style={style.modalView}>
          {selectedItem && (
            <View style={{ backgroundColor: "White" }}>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "darkblue",
                  fontSize: 20,
                }}
              >
                Update Details
              </Text>
              <View style={style.viewContainer}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 12,
                  }}
                >
                  MasterName :
                </Text>
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
                  value={selectedItem.historyId}
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
                  renderItem={renderItemmaster}
                ></Dropdown>
              </View>
              <View style={style.viewContainer}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 12,
                  }}
                >
                  TimeStamp :
                </Text>
                <Pressable onPress={() => setShowDatePicker(true)}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={style.Datepicker}> Select Date</Text>
                    <Text
                      style={{
                        textAlign: "center",
                        marginLeft: 5,
                        marginTop: 5,
                        fontSize: 15,
                      }}
                    >
                      {format(new Date(timeStamp), "dd/MM/yyyy HH:mm")}
                    </Text>
                  </View>
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
              <View style={style.viewContainer}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 12,
                  }}
                >
                  Status :{" "}
                </Text>
                <TextInput
                  style={style.inputfield}
                  value={status}
                  onChangeText={onChangeStatus}
                ></TextInput>
              </View>
              <View style={style.viewContainer}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 12,
                  }}
                >
                  Value :
                </Text>
                <TextInput
                  style={style.inputfield}
                  keyboardType="numeric"
                  value={correctionValue.toString()}
                  onChangeText={onChangeValue}
                ></TextInput>
              </View>
              <View style={style.buttonContainer}>
                <Pressable
                  style={[style.buttonLogin, style.customButton]}
                  onPress={() => onUpdateDetails(selectedItem)}
                >
                  <Text style={{ color: "#fff" }}>Save</Text>
                </Pressable>
                <Pressable
                  style={[style.buttonClear, style.customButton]}
                  onPress={hideEditModal}
                >
                  <Text style={{ color: "#fff" }}>Close</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </Modal>
      <Modal animationIn="slideInUp" isVisible={deleteModelVisible}>
        <View style={style.deleteModalView}>
          <View style={{ backgroundColor: "White" }}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "darkblue",
              }}
            >
              Are you sure you want to proceed?
            </Text>
            <View style={style.viewContainer}>
              <Pressable
                style={[style.buttonLogin, style.customButton]}
                onPress={() => {
                  setDeleteModelVisible(false);
                  onConfirm(selectedItem);
                }}
              >
                <Text style={style.buttonText}>Confirm</Text>
              </Pressable>
              <Pressable
                style={[style.cancelButton, style.customButton]}
                onPress={() => {
                  setDeleteModelVisible(false);
                }}
              >
                <Text style={[style.buttonText]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[style.customButton, style.signoutButton]}
        onPress={onHandleSignout}
      >
        <Text>SignOut</Text>
      </Pressable>
      {/* <Pressable
        style={[style.customButton]}
        onPress={() => onHandleClick(ListData)}
      >
        <Text>test</Text>
      </Pressable> */}
    </>
  );
}
const width = Dimensions.get("window").width - 70;
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "gray",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 1,
  },
  List: {
    marginTop: 0,
  },
  icon: {
    marginRight: 5,
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
    //marginRight: 10,
    //marginLeft: 5,
  },
  textItem: {
    flex: 1,
    fontSize: 11,
  },
  bodycontainer: {
    flexDirection: "row",
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
  Datepicker: {
    padding: 3,
    borderRadius: 10,
    marginBottom: 5,
    borderColor: "blue",
    backgroundColor: "gray",
    // marginRight: 100,
    marginLeft: 8,
    width: 100,
    alignContent: "center",
    justifyContent: "center",
    paddingLeft: 10,
    marginTop: 10,
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
  },
  newButton: {
    padding: 5,
    backgroundColor: "green",
    borderRadius: 10,
    alignSelf: "flex-end",
    margin: 15,
  },
  signoutButton: {
    padding: 5,
    backgroundColor: "orange",
    borderRadius: 5,
    alignSelf: "flex-end",
    margin: 10,
  },
  eachCard: {
    height: 100,
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#850D5F",
    //width: width,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  inputfield: {
    width: 200,
    height: 40,
    borderRadius: 15,
    paddingLeft: 20,
    borderWidth: 2,
    borderColor: "blue",
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
    marginLeft: 5,
  },
  items: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  modalView: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  viewModalView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  gridItem: {
    flex: 1,
    //marginleft: 18,
    //height: 45,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    marginTop: 3,
    marginRight: 8,
    marginLeft: 8,
    overflow: Platform.OS == "android" ? "hidden" : "visible",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  customButton: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 4,
    marginRight: 4,
    borderColor: "blue",
  },
  deleteModalView: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonLogin: {
    backgroundColor: "green",
    textAlign: "center",
    color: "white",
  },
  buttonDelete: {
    backgroundColor: "red",
    textAlign: "center",
  },
  buttonClear: {
    backgroundColor: "#131413",
    textAlign: "center",
    color: "white",
  },
  inputTitle: {
    paddingLeft: 20,
    // opacity: 0.5,
    color: "black",
    fontWeight: "bold",
    fontFamily: "serif",
    fontSize: 15,
    marginRight: 15,
  },
  confirmButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});
export default DataCorrectionListPage;
