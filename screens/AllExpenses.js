import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-contex";

function AllExpenses() {
  const expensesContext = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expensePeriod="Total"
      expenses={expensesContext.expenses}
      fallbackText="No expenses"
    />
  );
}

export default AllExpenses;
