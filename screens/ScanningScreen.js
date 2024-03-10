import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import * as Progress from "react-native-progress";
import ExpensesOutput from "../components/ExpensesOut/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { negateStatusDone, triggerNetworkScan } from "../util/http";
import { checkScanStatus } from "../util/http";
import { fetchDevices } from "../util/http";

function ScanningScreen({ navigation, route }) {
  const [progress, setProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const expensesCtx = useContext(ExpensesContext);
  const slideUpAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkScanAndSetComplete = async () => {
      let count = 0;
      // while (true) {
      const scanStatus = await checkScanStatus();
      console.log(`ScanningScreen.js: Scan status: ${scanStatus["Done"]}`);
      console.log(scanStatus);
      if (scanStatus["Done"] == true) {
        console.log("ScanningScreen.js: Scan Complete");
        const devices = await fetchDevices();
        expensesCtx.setDevices(devices);
        console.log("ScanningScreen.js: Devices: ");
        console.log(devices);
        setScanComplete(true);
        clearInterval(interval);
        // break;
      } else {
        console.log("ScanningScreen.js: Scan Incomplete");
        // sleep for 2 seconds
        // count += 1;
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      // }
    };

    const interval = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 0.3, 1));

      if (progress >= 1) {
        checkScanAndSetComplete();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    async function ReloadScan() {
      console.log("ScanningScreen.js: entered useEffect of ReloadScan");
      const response2=await negateStatusDone();
      const response1=await triggerNetworkScan();
      console.log(response1);
      console.log(response2);
    }
    setProgress(0);
    setScanComplete(false);
    console.log("ScanningScreen.js: entered useEffect of ReloadScan");
    slideUpAnim.setValue(0);
    ReloadScan();
  }, [route.params]);

  useEffect(() => {
    // devices = expensesCtx.getDevices();
    console.log("ScanningScreen.js: entered useEffect");
    console.log("ScanningScreen.js: Devices" + expensesCtx.devices);
    console.log("SlideUpAnimation");

    // Trigger the slide-up animation when scan is complete
    if (scanComplete) {
      Animated.timing(slideUpAnim, {
        toValue: 1,
        duration: 500, // Adjust duration as needed
        useNativeDriver: false,
      }).start();
    }
  }, [scanComplete]);

  return (
    <View style={styles.container}>
      {scanComplete ? (
        <Animated.View
          style={[
            !scanComplete && styles.UpperContainer,
            {
              transform: [
                {
                  translateY: slideUpAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0], // Adjust the values based on the desired slide-up distance
                  }),
                },
              ],
            },
          ]}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.text}>Scanning Network</Text>
            <Progress.Bar progress={progress} width={200} />
            {scanComplete && (
              <Text style={styles.scanCompleteText}>Scan Complete</Text>
            )}
          </View>
        </Animated.View>
      ) : (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.text}>Scanning Network</Text>
          <Progress.Bar progress={progress} width={200} />
          {scanComplete && (
            <Text style={styles.scanCompleteText}>Scan Complete</Text>
          )}
        </View>
      )}

      {scanComplete && (
        <Animated.View
          style={[
            styles.DevicesListContainer,
            {
              transform: [
                {
                  translateY: slideUpAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0], // Adjust the values based on the desired slide-up distance
                  }),
                },
              ],
            },
          ]}
        >
          <ExpensesOutput
            devices={expensesCtx.devices}
            returnS={"ScanningScreen"}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  DevicesListContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  UpperContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scanCompleteText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    color: "green", // Adjust color as needed
  },
});

export default ScanningScreen;
