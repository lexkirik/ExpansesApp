import { useContext, useLayoutEffect } from "react";
import { View } from "react-native";
import Button from "../components/Button";
import { GlobalStyles } from "../constants/styles";
import { StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import { ExpensesContext } from "../store/expenses-contex";

function ManageExpenses({ route, navigation }) {
  const expensesContext = useContext(ExpensesContext);
  const editedExpenseID = route.params?.expenseID;
  const isEditing = !!editedExpenseID;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add a New Expense",
    });
  }, [navigation, isEditing]);

  function removeExpenseHandler() {
    expensesContext.removeExpense(editedExpenseID);
    navigation.goBack();
  }

  function cancelHandelr() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expensesContext.updateExpense(editedExpenseID, {
        description: "Test!",
        amount: 19.99,
        date: new Date("2025-09-03"),
      });
    } else {
      expensesContext.addExpense({
        description: "Test",
        amount: 12.99,
        date: new Date("2025-09-04"),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <CustomButton mode="flat" onPress={cancelHandelr} style={styles.button}>
          Cancel
        </CustomButton>
        <CustomButton onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </CustomButton>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
