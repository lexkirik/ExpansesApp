import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import CustomButton from "./CustomButton";
import { getFormattedDate } from "../utility/date";
import { GlobalStyles } from "../constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValue }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValue ? getFormattedDate(defaultValue.date) : "",
      isValid: true,
    },
    description: { value: defaultValue ? defaultValue.description : "" },
    isValid: true,
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitPressedHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== "Invalid Date";
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      // Alert.alert("Invalid input", "Check your values");
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: isAmountValid },
          date: { value: currentInputs.date.value, isValid: isDateValid },
          description: {
            value: currentInputs.description.value,
            isValid: isDescriptionValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const isFormValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expenses</Text>
      <View style={styles.rowContainer}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyBoardType: "decimal-pad",
            placeholder: "$0.00",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {isFormValid && (
        <Text style={styles.errorText}>Invalid input values</Text>
      )}
      <View style={styles.buttons}>
        <CustomButton mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </CustomButton>
        <CustomButton onPress={submitPressedHandler} style={styles.button}>
          {submitButtonLabel}
        </CustomButton>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 10,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 24,
    textAlign: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
