import { View, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../constants/styles";

const Dummy_Expenses = [
  {
    id: "f23",
    description: "safadf",
    amount: 89.99,
    date: new Date("2025-02-12"),
  },
  {
    id: "f24",
    description: "rwgd",
    amount: 8.99,
    date: new Date("2025-01-13"),
  },
  {
    id: "f25",
    description: "gsdgs",
    amount: 11.18,
    date: new Date("2025-06-01"),
  },
];

function ExpensesOutput({ expenses, expensePeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary period={expensePeriod} expenses={Dummy_Expenses} />
      <ExpensesList expenses={Dummy_Expenses} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
