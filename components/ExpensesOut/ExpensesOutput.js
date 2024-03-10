import { View, Text, StyleSheet, Pressable } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import GlobalStyles from "../../constants/styles";
import Button from "../UI/Button";
import { useState } from "react";
import { useContext } from "react";
import { ExpensesContext } from "../../store/expenses-context";

function ExpensesOutput(props) {
  let content = <Text style={styles.text}>No devices connected</Text>;
  // const expensesCtx = useContext(ExpensesContext);

  // let devices=expensesCtx.devices;
  // let Presonalized=false;
  return (
    <View style={styles.container}>
      {props.devices.length === 0 ? (
        content
      ) : (
        <>
          <ExpensesSummary
            devices={props.devices}
          />
          <ExpensesList
            devices={props.devices}
            returnS={props.returnS}
          />
        </>
      )}
    </View>
  );
}

export default ExpensesOutput;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    width: 390,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginTop: 24,
  },
  textBase: {
    color: "white",
    fontSize: 16,
    textAlign: "left",
    fontWeight:'bold',
  },
});
