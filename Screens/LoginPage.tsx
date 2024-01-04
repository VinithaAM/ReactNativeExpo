import axios from "axios";
import React, { useState } from "react";
// import Toast from 'react-native-toast';
import {
  TextInput,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons/";
import { login } from "../Services/CommonService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// type Proptype = NativeStackScreenProps<ScreenType, "LoginPage">;

function LoginPage(prop) {
  const { navigation } = prop;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const onPressClear = () => {
    setUserName("");
    setPassword("");
  };

  const onChangeUsername = (e: any) => {
    setUserName(e);
  };
  const onChangePassword = (e: any) => {
    setPassword(e);
  };
  const oncancelhandle = () => {
    navigation.navigate("WelcomePage");
  };
  const loginfuntion = () => {
    var loginDetails = {
      userName: userName,
      password: password,
    };
    if (userName != undefined && userName != "") {
      if (password != undefined && password != "") {
        login(loginDetails)
          .then((result) => {
            if (result.data.status === "Failed") {
              // Toast.show(result.data.message, Toast.SHORT);
              alert(result.data.message);
            } else if (result.data.status === "Success") {
              AsyncStorage.setItem(
                "LoginResponse",

                result.data.data.token
              );
              setUserName("");
              setPassword("");
              navigation.navigate("FlatListPage");
            }
          })
          .catch((error: any) => {
            console.log("Error occurred", error);
            // Handle the error here (e.g., show error message, perform error-related actions)
          });
      } else {
        alert("Please Provide Valid Password .....");
      }
    } else {
      alert("Please Provide Valid UserName ....");
    }
  };
  const onHadleSignup = () => {
    navigation.navigate("RegistrationPage");
  };
  const [validationMessage, setValidationMessage] = useState("");
  const validatePassword = (password) => {
    // Password policies
    const minLength = 8;
    const maxLength = 20;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    // Check against policies
    if (password.length < minLength || password.length > maxLength) {
      setValidationMessage("Password must be between 8 and 20 characters");
    } else if (!hasUppercase || !hasLowercase) {
      setValidationMessage(
        "Password must contain both uppercase and lowercase letters"
      );
    } else if (!hasNumber) {
      setValidationMessage("Password must contain at least one number");
    } else if (!hasSpecialChar) {
      setValidationMessage(
        "Password must contain at least one special character"
      );
    } else {
      setValidationMessage("Password is valid");
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.textTitle}>Log In</Text>
      <Text style={style.inputTitle}>UserName</Text>
      <TextInput
        placeholder="Enter the Username"
        style={style.textInput}
        value={userName}
        onChangeText={onChangeUsername}
        maxLength={30}
      ></TextInput>
      <Text style={style.inputTitle}>Password</Text>
      <View>
        <TextInput
          placeholder="Enter the Password"
          style={style.textInput}
          value={password}
          maxLength={30}
          secureTextEntry={isPasswordSecure}
          onChangeText={onChangePassword}
          onKeyPress={validatePassword}

          // right={
          //   <TextInput.Icon
          //     name={() => <MaterialCommunityIcons name={isPasswordSecure ? "eye-off" : "eye"} size={28} color="black" />} // where <Icon /> is any component from vector-icons or anything else
          //     onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
          //   />
          // }
        ></TextInput>
        <MaterialCommunityIcons
          name={isPasswordSecure ? "eye-off" : "eye"}
          size={24}
          color="black"
          style={{ position: "absolute", top: 8, right: 10 }}
          onPress={() =>
            isPasswordSecure
              ? setIsPasswordSecure(false)
              : setIsPasswordSecure(true)
          }
        />
      </View>

      {/* {validationMessage !== "" && (
        <View style={style.errorMessage}>
          <Text style={style.errorText}>{validationMessage}</Text>
        </View>
      )} */}
      <View style={style.styleView}>
        <TouchableOpacity
          style={[style.buttonLogin, style.customButton]}
          onPress={loginfuntion}
        >
          <Text style={{ color: "#fff" }}>Login</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[style.buttonClear, style.customButton]}
          onPress={onPressClear}
        >
          <Text style={{ color: "#fff" }}> Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.buttonCancel, style.customButton]}
          onPress={oncancelhandle}
        >
          <Text style={{ color: "#fff" }}> Cancel</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={[style.button, style.signup]}
          onPress={onHadleSignup}
        >
          <Text style={style.buttonText}>SignUp for free</Text>
          {/* <Text style={style.buttonText}>You Don't have Account?</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}
const width = Dimensions.get("window").width - 70;
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "aqua",
  },
  textInput: {
    borderWidth: 2,
    borderColor: "black",
    width,
    height: 40,
    borderRadius: 25,
    paddingLeft: 15,
    marginBottom: 20,
  },
  inputTitle: {
    alignSelf: "flex-start",
    paddingLeft: 25,
    marginBottom: 5,
    opacity: 0.5,
    color: "black",
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  styleView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonCancel: {
    backgroundColor: "#147EFB",
    textAlign: "center",
  },
  customButton: {
    padding: 15,
    borderRadius: 5,
    marginLeft: 1,
    marginRight: 8,
    borderColor: "blue",
  },
  buttonLogin: {
    backgroundColor: "green",
    textAlign: "center",
    width: "40%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
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
  },
  signup: {
    backgroundColor: "#4267B2",
  },
  button: {
    width: "40%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorMessage: {
    marginTop: 10,
  },
  errorText: {
    color: "red",
  },
});
export default LoginPage;
