import { Pressable, StyleSheet, Text, View } from "react-native";
import GlobalStyles from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
function Vulcard({
  type,
  IP,
  threatLevel,
  securityReport,
  securityRecommendation,
}) {
  const navigation = useNavigation();
  function VulPressHandler() {
    navigation.navigate("Vulnerability Details", {
      type: type,
      IP: IP,
      threatLevel: threatLevel,
      securityReport: securityReport,
      securityRecommendation: securityRecommendation,
    });
  }
  return (
    <Pressable
      onPress={VulPressHandler}
      style={({ pressed }) => [
        pressed && styles.pressed,
        styles.vulnerabilityItem,
      ]}
    >
      <View style={styles.vulnerabilityItemText}>
        <Text style={styles.pressText}>Attack Type:</Text>
        <Text style={styles.textBase}>{type}</Text>
        <Text style={styles.pressText}>Infected IP Addresse(s):</Text>
        <Text style={styles.textBase}>{IP.map((ip) => ip).join(", ")}</Text>
        <Text style={styles.pressText}>Threat Level:</Text>
        {threatLevel === "High" && (
          <Text style={styles.redTextBase}>{threatLevel}</Text>
        )}
        {threatLevel === "Medium" && (
          <Text style={styles.orangeTextBase}>{threatLevel}</Text>
        )}
        {threatLevel === "Low" && (
          <Text style={styles.greenTextBase}>{threatLevel}</Text>
        )}
        <Text style={styles.pressText}>
          Press to Show Security threats and Recommendations
        </Text>
      </View>
    </Pressable>
  );
}
export default Vulcard;
const styles = StyleSheet.create({
  vulnerabilityItem: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    width: 360,

  },
  vulnerabilityItemText: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textBase: {
    color: "white",
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
  },
  redTextBase: {
    color: "red",
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
  },
  orangeTextBase: {
    color: "orange",
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
  },
  greenTextBase: {
    color: "green",
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.5,
  },
  pressText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
