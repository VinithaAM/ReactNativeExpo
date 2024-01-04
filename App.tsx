import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Screens/Navigatior";
import LoginPage from "./Screens/LoginPage";
import WelcomePage from "./Screens/WelcomePage";
import FlatListPage from "./Screens/FlatListPage";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./Screens/StackNavigation";
// import LoginPage from "./src/Screens/LoginPage";
// import Navigation from "./src/Screens/Navigation";

export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <Text>Open up App.tsx to start working on your app!</Text> */}
    //   <StatusBar style="auto" />
    <NavigationContainer>
      {/* <Navigation></Navigation> */}
      <StackNavigation></StackNavigation>
    </NavigationContainer>

    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
