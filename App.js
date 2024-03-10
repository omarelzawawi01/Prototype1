import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Screen1 from "./screens/Screen1";
import RecentVulnerabilitiesScreen from "./screens/RecentVulnerabilitesScreen";
import Screen3 from "./screens/Screen3";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconButton from "./components/UI/IconButton";
import GlobalStyles from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { ExpensesContext } from "./store/expenses-context";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ExpensesContextProvider from "./store/expenses-context";
import AppLoading from "expo-app-loading";
// import { ExpensesContext } from "./store/expenses-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState, useEffect } from "react";
import ScanningScreen from "./screens/ScanningScreen";
import VulnerabilitiesDetailsScreen from "./screens/VulnerabilitesDetailsScreen";
// import GlobalStyles from "./constants/styles";
import firebase from "firebase/app";
import { Alert } from "react-native";

const Tab = createBottomTabNavigator();
const stack = createNativeStackNavigator();
import { useNavigation } from "@react-navigation/native";

function logout() {
  ExpensesContext.logout();
}

function MyHomeStack() {
  const expensesCtx = useContext(ExpensesContext);
  const navigation = useNavigation();
  return (
    <stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
        // headerShown: false,
      }}
    >
      <stack.Screen name="Dashboard" component={Screen1} />
      <stack.Screen
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="reload"
              size={20}
              color={tintColor}
              onTap={() => {
                navigation.navigate("ScanningScreen", { ReloadScan: false });
              }}
            />
          ),
          title: "Devices",
        }}
        name="ScanningScreen"
        component={ScanningScreen}
      />
    </stack.Navigator>
  );
}
function MyVulnerabilitiesStack() {
  return (
    <stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "#fff",
        headerShown: false,
      }}
    >
      <stack.Screen
        name="Recent Vulnerabilities Screen"
        component={RecentVulnerabilitiesScreen}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="Vulnerability Details"
        component={VulnerabilitiesDetailsScreen}
        options={{
          presentation: "modal",
          // headerShown: false,
        }}
      />
    </stack.Navigator>
  );
}

function MyTabs() {
  expensesCtx = useContext(ExpensesContext);
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,

        headerLeft: ({ tintColor }) => (
          <IconButton
            icon="log-out"
            size={24}
            color={"red"}
            onTap={() => expensesCtx.logout()}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={MyHomeStack}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          // headerRight: ({ tintColor }) => (
          //   <IconButton
          //     icon="reload"
          //     size={20}
          //     color={tintColor}
          //     onTap={() => {
          //       navigation.navigate("ScanningScreen", { ReloadScan: false });
          //     }}
          //   />
          // ),
        }}
      />
      <Tab.Screen
        name="Recent Vulnerabilities"
        component={MyVulnerabilitiesStack}
        options={{
          title: "Recent Vulnerabilities",
          tabBarLabel: "Recent Vulnerabilities",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function AuthStack() {
  return (
    <stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      <stack.Screen name="Login" component={LoginScreen} />
      <stack.Screen name="Signup" component={SignupScreen} />
    </stack.Navigator>
  );
}
function AuthenticatedStack() {
  return (
    <stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "#fff",
      }}
    >
      <stack.Screen
        name="HomePage"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="Screen3"
        component={Screen3}
        options={{
          presentation: "modal",
          // headerShown: false,
        }}
      />
    </stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(ExpensesContext);
  // console.log("AuthContext in Navigation.js: ", authCtx);
  return (
    <NavigationContainer>
      {authCtx.isAuthenticated && <AuthenticatedStack />}
      {!authCtx.isAuthenticated && <AuthStack />}
      {/* <AuthStack/> */}
    </NavigationContainer>
  );
}
function Root() {
  const authCtx = useContext(ExpensesContext);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        authCtx.authenticate(token);
      }
      setIsReady(true);
    });
  }, []);
  if (!isReady) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  // console.log("omar");
  useEffect(() => {
    // Initialize Firebase
    const firebaseConfig = {
      // Your Firebase config details
      apiKey: "AIzaSyBwTvN9OucS3a-Ogu8SqSYWCHbmLZ7pRao",
      authDomain: "prototype-16d1c.firebaseapp.com",
      databaseURL: "https://prototype-16d1c-default-rtdb.firebaseio.com",
      projectId: "prototype-16d1c",
      storageBucket: "prototype-16d1c.appspot.com",
      messagingSenderId: "411530972461",
      appId: "1:411530972461:ios:3caacdd3093e342b67d7a4",
    };
    if (!firebase) {
      console.log("firebase is not definedd");
    } else {
      window.firebase = firebase;
      // console.log(
      //   `firebase.apps.length: ${firebase.apps.length}, firebaseConfig: ${firebaseConfig}, firebase: ${firebase}`
      // );
      // if (!firebase.apps.length) {
      window.firebase.initializeApp(firebaseConfig);
      // }

      // Reference to 'deviceConnected' boolean in Firebase Realtime Database
      const databaseRef = firebase.database().ref("/deviceConnected");

      // Listen for changes in 'deviceConnected' value
      const deviceConnectedListener = databaseRef.on("value", (snapshot) => {
        const deviceConnected = snapshot.val();

        // Check if 'deviceConnected' value is changed
        if (deviceConnected !== null) {
          if (deviceConnected === true) {
            // Send notification if device is connected
            sendNotification("Device is connected");
          } else {
            // Send notification if device is disconnected
            sendNotification("Device is disconnected");
          }
        }
      });

      return () => {
        // Unsubscribe from listeners when component unmounts
        deviceConnectedListener();
      };
    }
  }, []);

  const sendNotification = async (message) => {
    try {
      // Your notification sending logic here
      Alert.alert("Notification", message);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <Root />
      </ExpensesContextProvider>
    </>
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
