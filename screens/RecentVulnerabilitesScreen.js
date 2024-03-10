import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import GlobalStyles from "../constants/styles";
import Vulcard from "../components/VulnerabilitesOutput/Vulcard";
import VulSummary from "../components/VulnerabilitesOutput/VulSummary";

function RecentVulnerabilitiesScreen() {
  let currentVulnerabilities = [
    {
      ID: "1",
      type: "Cross-Site Scripting (XSS)",
      ipAddresses: ["192.168.0.1", "192.168.0.2"],
      ThreatLevel: "High",
      securityReport:
        "This vulnerability allows attackers to inject malicious scripts into web pages viewed by users.",
      securityRecommendation:
        "To mitigate this vulnerability, ensure all user input is properly validated and sanitized before displaying it on web pages.",
    },
    {
      ID: "2",
      type: "SQL Injection",
      ipAddresses: ["192.168.0.3"],
      ThreatLevel: "High",
      securityReport:
        "This vulnerability allows attackers to manipulate database queries to access or modify sensitive data.",
      securityRecommendation:
        "To mitigate this vulnerability, use parameterized queries or prepared statements to prevent malicious input from affecting the query logic.",
    },
    {
      ID: "3",
      type: "Broken Authentication",
      ipAddresses: ["192.168.0.1", "192.156.14.3"],
      ThreatLevel: "Medium",
      securityReport:
        "This vulnerability allows attackers to bypass authentication methods to gain unauthorized access to sensitive data.",
      securityRecommendation:
        "To mitigate this vulnerability, ensure all authentication methods are properly implemented and validated.",
    },
    {
      ID: "4",
      type: "Sensitive Data Exposure",
      ipAddresses: ["192.162.1.0"],
      ThreatLevel: "Low",
      securityReport:
        "This vulnerability allows attackers to access sensitive data in plaintext, such as passwords and credit card numbers.",
      securityRecommendation:
        "To mitigate this vulnerability, ensure all sensitive data is properly encrypted and stored.",
    },
    // Add more vulnerabilities as needed
  ];
  function renderVulnerabilityItem(itemData) {
    return (
      <Vulcard
        type={itemData.item.type}
        IP={itemData.item.ipAddresses}
        threatLevel={itemData.item.ThreatLevel}
        securityReport={itemData.item.securityReport}
        securityRecommendation={itemData.item.securityRecommendation}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.SummaryContainer}>
        <VulSummary vulnerabilities={currentVulnerabilities} />
      </View>
          <FlatList
            data={currentVulnerabilities}
            renderItem={renderVulnerabilityItem}
            keyExtractor={(item) => item.type}
          />
    </View>
  );
}
export default RecentVulnerabilitiesScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.primary100,
    height: "100%",
  },
  SummaryContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: "darkslateblue",
    fontSize: 30,
    textAlign: "center",
  },
  textBase: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  descriptionText: {
    fontWeight: "bold",
  },
  vulnerabilityItem: {
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
});
