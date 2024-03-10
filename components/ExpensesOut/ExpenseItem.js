import { Pressable, View, Text, StyleSheet } from "react-native";
import GlobalStyles from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
};
function ExpenseItem(props) {
  const navigation = useNavigation();
  function DeviceItemTapHandler() {
    navigation.navigate("Screen3", {
      deviceId: props.ID,
      process: "edit",
      returnScreen: props.returnScreen || "ScanningScreen",
    });
  }
  // const dateString=(props.date.getMonth())+'-'+(props.date.getDay())+'-'+props.date.getFullYear();
  return (
    <Pressable
      onPress={DeviceItemTapHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.deviceItem}>
        <View>
          <Text style={[styles.textBase, styles.descriptionText]}>
            {props.title && props.title}
            {!props.title && <Text style={styles.textBase}>No Name</Text>}
          </Text>
          {/* <Text style={styles.textBase}> */}
            {/* {moment(props.date).subtract(1,'months').format('MM/DD/YYYY')} */}
            {/* {props.date.toISOString().substring(0, 10)} */}
          {/* </Text> */}
        </View>
        <View style={styles.amountContainer}>
          <Text>{props.ip}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;
const styles = StyleSheet.create({
  deviceItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
    fontSize: 16,
  },
  descriptionText: {
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 16,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "white",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
  },
  amountText: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.5,
  },
});
