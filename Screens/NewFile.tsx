import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  LayoutAnimation,
} from "react-native";
import { getHistoryCorrection } from "../Services/CommonService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenType } from "./StackNavigation";
import Accordtion from "./Accordtion";

type Proptype = NativeStackScreenProps<ScreenType, "NewPage">;
function NewFile(props: Proptype) {
  const { navigation } = props;
  const [ListData, setListData] = useState([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [renderItem, setrenderItem] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      getHistoryData();
    }, 5000);
  }, []);
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
  const onClick = (index, id) => {
    console.log("new", id);
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
    // const temp = ListData.filter((x) => x.id == id).slice();
    // temp[index].value = temp[index].value;
    // console.log("Data", temp);
    // setListData(temp);
    // <Accordtion title={id.item}></Accordtion>;
    return (
      <>
        {/* <CommonGrid title={e.item}></CommonGrid> */}
        {/* <Accordtion title={id.item}></Accordtion> */}
      </>
    );
    //this.setState({ data: temp });
  };
  const toggleExpand = () => {
    setViewModalVisible(!viewModalVisible);
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // this.setState({ expanded: !this.state.expanded });
  };
  const functions = () => {
    const item = ListData;
    //setrenderItem(item);
    return item.map((x) => x.historyId).toString();
  };
  function renderItems(item: any, index) {
    const selectedItem = ListData.filter((x) => x.id == item.id)[0];
    console.log("filtereditem", selectedItem);
    return (
      <>
        {/* <CommonGrid title={e.item}></CommonGrid> */}
        <View>
          <View>
            <TouchableOpacity onPress={() => onClick(index, selectedItem)}>
              {/* style={[styles.childRow, styles.button, item.value ? styles.btnActive : styles.btnInActive]} */}
              <Text>{selectedItem.historyId}</Text>
              {/* <Text>{item.statusTags}</Text>
              <Text>{item.correctedValue}</Text>
              <Text>{item.timeStamp}</Text> */}
              {/* style={[styles.font, styles.itemInActive]} */}
              {/* <Icon name={'check-circle'} size={24} color={ item.value ? Colors.GREEN :  Colors.LIGHTGRAY } /> */}
            </TouchableOpacity>
            {/* <View style={styles.childHr}/> */}
          </View>
        </View>
      </>
    );
  }
  const items = (i) => {
    console.log("q", i);
    return i.historyId;
  };
  return (
    <View>
      <TouchableOpacity onPress={() => toggleExpand()}>
        {/* {ListData.length > 0 && (
          <Text>
            {ListData.map((item, index) => (
              <Text key={index}>{items(item)}</Text>
            ))}
          </Text>
        )} */}
        {/* style={styles.row} */}
        {/* {ListData.length>0 && } */}
        <Text>ListOfData</Text>
        {/* style={[styles.title]} */}
        {/* <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={Colors.DARKGRAY} /> */}
      </TouchableOpacity>
      <View />
      {/* style={styles.parentHr} */}
      {viewModalVisible && (
        <View style={{}}>
          <FlatList
            data={ListData}
            numColumns={1}
            scrollEnabled={false}
            renderItem={({ item, index }) => renderItems(item, index)}
            // renderItem={({ item, index }) => (

            // )}
          />
        </View>
      )}
    </View>
  );
}

export default NewFile;
