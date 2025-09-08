import axios from "axios";

const BACKEND_URL =
  "https://expansesapp-b7203-default-rtdb.europe-west1.firebasedatabase.app";

export function storeExpense(expenseData) {
  const response = axios.post(BACKEND_URL + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpense() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expense/${id}.json`, expenseData);
}

export function removeExpense() {
  return axios.delete(BACKEND_URL + `/expense/${id}.json`);
}
