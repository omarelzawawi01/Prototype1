import { Alert, Text } from "react-native";
import React, { useRef } from "react";
import { useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import GlobalStyles from "../constants/styles";
import { View, StyleSheet } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { useNavigation } from "@react-navigation/native";
function VulnerabilitiesDetailsScreen({ navigation, route }) {
  const { type } = route.params;
  const { IP } = route.params;
  const { threatLevel } = route.params;
  const { securityReport } = route.params;
  const { securityRecommendation } = route.params;

  const expensesContext = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log("VulnerabilitiesDetailsScreen.js: type: " + type);
  console.log("VulnerabilitiesDetailsScreen.js: IP: " + IP);
  console.log("VulnerabilitiesDetailsScreen.js: threatLevel: " + threatLevel);
  console.log(
    "VulnerabilitiesDetailsScreen.js: securityReport: " + securityReport
  );
  console.log(
    "VulnerabilitiesDetailsScreen.js: securityRecommendation: " +
      securityRecommendation
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${type}`,
      Headers: "Vulnerabilities",
    });
  }, [navigation]);
  //   function deleteDeviceHandler() {
  //     // add an alert to confirm the deletion
  //     Alert.alert(
  //       "Remove Device",
  //       "Are you sure you want to remove this device? ",
  //       [
  //         {
  //           text: "Cancel",
  //           onPress: () => {
  //             return;
  //           },
  //         },
  //         {
  //           text: "OK",
  //           onPress: () => {
  //             async function deleteEx() {
  //               setIsLoading(true);
  //               setIsSaving(true);
  //               console.log("delete id: " + expenseId);
  //               try {
  //                 await deleteExpense(expenseId);
  //                 expensesContext.deleteExpense(expenseId);
  //                 navigation.goBack();
  //               } catch (err) {
  //                 setError(err.message);
  //                 setIsLoading(false);
  //               }
  //               // setIsSaving(false);
  //             }
  //             function deleteDevice() {
  //               setIsLoading(true);
  //               console.log("delete device");
  //               expensesContext.deleteDevice(deviceId);
  //               console.log("device deleted");
  //               console.log(expensesContext.devices);
  //               navigation.goBack();
  //               setIsLoading(false);
  //             }
  //             //   deleteEx();
  //             deleteDevice();
  //           },
  //         },
  //       ]
  //     );

  //     // console.log(expenseId);
  //     // if (toastRef.current) {
  //     //   toastRef.current.show({
  //     //     type: "success", // You can use 'error', 'info', or 'success' types
  //     //     text1: "Record Deleted",
  //     //     visibilityTime: 2000, // Duration of the toast message (in milliseconds)
  //     //   });
  //     // }
  //     // add an alert to indicate that the record has been deleted
  //     // Alert.alert("Record Deleted", "The record has been deleted", [
  //     //   {
  //     //     text: "OK",
  //     //     onPress: () => {
  //     //       navigation.goBack();
  //     //     },
  //     //   },
  //     // ]);
  //     // navigation.goBack();
  //   }
  //   function cancelHandler() {
  //     navigation.goBack();
  //   }
  //   async function saveHandler(expense) {
  //     console.log("IN Manage Expense Save Handler");
  //     console.log("Expense to be edited, manage expense: " + expense);
  //     // expense.token=expensesContext.token
  //     // expense.id = expenseId;
  //     setIsLoading(true);
  //     try {
  //       if (process === "add") {
  //         console.log("adding");
  //         setIsLoading(true);
  //         expense.userEmail = expensesContext.email;
  //         const id = await storeExpense(expense);
  //         setIsLoading(false);
  //         console.log("in manage expense, id: " + id);
  //         expense.id = id;
  //         expensesContext.addExpense(expense);
  //       } else {
  //         console.log("editing : " + expenseId);
  //         console.log("selectedExpenseEmial:" + selectedExpense.userEmail);
  //         setIsLoading(true);
  //         expense.userEmail = selectedExpense.userEmail;
  //         expense.id = expenseId;
  //         const id = await updateExpense(expenseId, expense);
  //         // console.log("ID after Update: "+id);
  //         setIsLoading(false);
  //         expensesContext.updateExpense(expense, expenseId);
  //       }
  //       navigation.goBack();
  //     } catch (err) {
  //       setError("Could not save the expense. Please try again later.");
  //       setIsLoading(false);
  //     }
  //   }
  //   function errorConfirmedHandler() {
  //     setError(null);
  //   }

  if (error && !isLoading) {
    return <ErrorOverlay error={error} onTap={errorConfirmedHandler} />;
  }
  if (isLoading) {
    // console.log("loading");
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      {/* <ExpenseForm /> */}

      {/* <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={saveHandler}
        submitButtonLabel={process === "add" ? "Add Expense" : "Save Changes"}
        defaultValues={selectedDevice}
      /> */}
      <View style={styles.content}>
        <Text style={styles.Textbase}>Attack Name: </Text>
        <Text style={styles.Textbase}>{type}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.Textbase}>Infected IPs: </Text>
        <Text style={styles.Textbase}>{IP.map((ip) => ip).join(", ")}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.Textbase}>ThreatLevel: </Text>
        {threatLevel === "High" && (
          <Text style={styles.redTextbase}>{threatLevel}</Text>
        )}
        {threatLevel === "Medium" && (
          <Text style={styles.orangeTextbase}>{threatLevel}</Text>
        )}
        {threatLevel === "Low" && (
          <Text style={styles.greenTextbase}>{threatLevel}</Text>
        )}
      </View>
      <View style={styles.largeContent}>
        <Text style={styles.Textbase}>Security Report: </Text>
        <Text style={styles.Textbase}>{securityReport}</Text>
      </View>
      <View style={styles.largeContent}>
        <Text style={styles.Textbase}>Security Recommendations: </Text>
        <Text style={styles.Textbase}>{securityRecommendation}</Text>
      </View>
      {process === "edit" && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={24}
            color={GlobalStyles.colors.primary100}
            onTap={deleteDeviceHandler}
          />
        </View>
      )}
    </View>
  );
}
export default VulnerabilitiesDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 20,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  Textbase: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  redTextbase: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  orangeTextbase: {
    color: "orange",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  greenTextbase: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
  },
  largeContent:{
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    marginVertical: 10,
  }
});
