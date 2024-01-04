import { AccordionList } from "accordion-collapse-react-native";
import React from "react";
// import { Separator } from 'native-base';
import { View, Text } from "react-native";

function Accordition() {
  const state = {
    list: [
      {
        id: 1,
        title: "Getting Started",
        body: "React native Accordion/Collapse component, very good to use in toggles & show/hide content",
      },
      {
        id: 2,
        title: "Components",
        body: "AccordionList,Collapse,CollapseHeader & CollapseBody",
      },
    ],
  };

  const _head = (item) => {
    return (
      <View></View>
      //   <Separator bordered style={{ alignItems: "center" }}>
      //     <Text>{item.title}</Text>
      //   </Separator>
    );
  };

  const _body = (item) => {
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ textAlign: "center" }}>{item.body}</Text>
      </View>
    );
  };

  return (
    <AccordionList
      list={this.state.list}
      header={this._head}
      body={this._body}
      keyExtractor={(item) => `${item.id}`}
    />
  );
}

export default Accordition;
