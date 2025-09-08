import { useContext, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import Button from "../components/Button";
import { GlobalStyles } from "../constants/styles";
import { StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import { ExpensesContext } from "../store/expenses-contex";
import ExpenseForm from "../components/ExpenseForm";
import { removeExpense, storeExpense, updateExpense } from "../utility/http";
import Loading from "../components/Loading";
import Error from "../components/Error";

function ManageExpenses({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const expensesContext = useContext(ExpensesContext);
  const editedExpenseID = route.params?.expenseID;
  const isEditing = !!editedExpenseID;

  const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === editedExpenseID
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add a New Expense",
    });
  }, [navigation, isEditing]);

  async function removeExpenseHandler() {
    setIsSubmitting(true);
    try {
      await removeExpense(editedExpenseID);
      expensesContext.removeExpense(editedExpenseID);
      navigation.goBack();
    } catch (error) {
      setError("Couldn't remove expense");
      setIsSubmitting(false);
    }
  }

  function cancelHandelr() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesContext.updateExpense(editedExpenseID, expenseData);
        await updateExpense(editedExpenseID, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesContext.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Couldn't save data");
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <Error message={error} />;
  }

  if (isSubmitting) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandelr}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValue={selectedExpense}
      />
      {isEditing && (
        <View style={styles.trash}>
          <Button
            icon="trash"
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={removeExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  trash: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
