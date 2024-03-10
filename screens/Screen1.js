import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import GlobalStyles from "../constants/styles";
import Button from "../components/UI/Button";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import FlatButton from "../components/UI/FlatButton";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import IconButton from "../components/UI/IconButton";
import { negateStatusDone, triggerNetworkScan } from "../util/http";
function Screen1() {
  const navigation = useNavigation();
  function ScanButtonPressed() {
    console.log("Scan Button Pressed");
    navigation.navigate("ScanningScreen", { ReloadScan: true });
    triggerNetworkScan();
    negateStatusDone();
  }
  function vulnerabilitiesButtonPressed() {
    console.log("Vulnerabilities Button Pressed");
    navigation.navigate("Recent Vulnerabilities");
  }
  return (
    <View style={styles.container}>
      <View style={styles.ImageContainer}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/home.png")}
        />
        <Image style={styles.Image} source={require("../assets/router.png")} />
      </View>
      <View style={styles.ButtonContainer}>
        <Button onPress={ScanButtonPressed}>
          <Text>Scan Network</Text>
        </Button>
      </View>
      <View style={styles.ImageContainer2}>
        <Image style={styles.Image2} source={require("../assets/shield.png")} />
      </View>
      <View style={styles.ButtonContainer}>
        <Button onPress={vulnerabilitiesButtonPressed}>
          <Text>Show Recent Vulnerabilities</Text>
        </Button>
      </View>
    </View>
  );
}
export default Screen1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: GlobalStyles.colors.primary700,
    fontSize: 30,
    textAlign: "center",
  },
  ImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 160,
  },
  Image: {
    marginTop: 50,
    width: 80,
    height: 80,
  },
  Image2: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  ImageContainer2: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 160,
    marginTop: 40,
  },
  ButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: 150,
    height: 150,
    marginLeft: 30,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
