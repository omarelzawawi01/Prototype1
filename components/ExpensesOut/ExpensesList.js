import { View, Text, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { ExpensesContext } from "../../store/expenses-context";
import { useContext } from "react";
function ExpensesList(props) {
  const expensesCtx=useContext(ExpensesContext);
  function renderExpenseItem(itemData) {
    // console.log("id in render: "+itemData.item.ID)
    return (
      <View>
        <ExpenseItem
          title={itemData.item.Name}
          ip={itemData.item.IP}
          ID={itemData.item.ID}
          mac={itemData.item.MAC}
          returnScreen={props.returnS}
        />
      </View>
    );
  }
  let currentDevices=props.devices;
  // console.log(props.devices);
  // console.log("Current token: "+expensesCtx.token);
  console.log("Current email: "+expensesCtx.email);
  return (
    <FlatList
      data={currentDevices}
      keyExtractor={(item) => item.ID}
      renderItem={renderExpenseItem}
    />
  );
}

export default ExpensesList;
