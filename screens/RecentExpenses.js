import ExpensesOutput from "../components/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-contex";
import { getDateMinusDays } from "../utility/date";
import { fetchExpense } from "../utility/http";
import Loading from "../components/Loading";
import Error from "../components/Error";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpense();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Couldn't fetch expenses");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <Error message={error} />;
  }

  if (isFetching) {
    return <Loading />;
  }

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expensePeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No expenses"
    />
  );
}

export default RecentExpenses;
