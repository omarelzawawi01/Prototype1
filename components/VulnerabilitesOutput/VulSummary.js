import { View, Text, StyleSheet } from "react-native";
import GlobalStyles from "../../constants/styles";
function VulSummary({ vulnerabilities }) {
  const Totalcount = vulnerabilities.length;
  const Highcount = vulnerabilities.filter(
    (vulnerability) => vulnerability.ThreatLevel === "High"
  ).length;
  const Mediumcount = vulnerabilities.filter(
    (vulnerability) => vulnerability.ThreatLevel === "Medium"
  ).length;
  const Lowcount = vulnerabilities.filter(
    (vulnerability) => vulnerability.ThreatLevel === "Low"
  ).length;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Total Vulnerabilities: {Totalcount}</Text>
        <View style={styles.context}>
          <Text style={styles.High}>High: {Highcount}</Text>
          <Text style={styles.medium}>Medium: {Mediumcount}</Text>
          <Text style={styles.low}>Low: {Lowcount}</Text>
        </View>
      </View>
    </View>
  );
}
export default VulSummary;
const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: 360,
    
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 20,
    width: "100%",
  },
  text: {
    fontSize: 15,
    color: GlobalStyles.colors.primary50,
    fontWeight: "bold",
    padding: 5,
  },
  High: {
    fontSize: 15,
    color: "red",
    fontWeight: "bold",
    padding: 5,
  },
  medium: {
    fontSize: 15,
    color: "orange",
    fontWeight: "bold",
    padding: 5,
  },
  low: {
    fontSize: 15,
    color: "green",
    fontWeight: "bold",
    padding: 5,
  },
  context: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-evenly",
    padding: 5,
  },
});
