import axios from "axios";
const BACKEND_URL = "https://prototype-16d1c-default-rtdb.firebaseio.com/";
const API_KEY = "AIzaSyB8DPU6jtXK7iFOFJQ_xuoIeqwYQOOUSas";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}
export async function fetchExpenses() {
  console.log("in fetching");
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  };
  let response;

  try {
    response = await axios.get(BACKEND_URL + "/expenses.json", axiosConfig);
    // response = await axios.get(BACKEND_URL + "/expenses.json");
  } catch (error) {
    console.log("error in fetching");
    console.log(error);
    return [];
  }
  const expenses = [];
  console.log("2");
  console.log("returned response data" + response.data);
  for (const key in response.data) {
    expenses.push({
      id: key,
      title: response.data[key].title,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      userEmail: response.data[key].userEmail,
    });
    console.log("UserEmail in http response: " + response.data[key].userEmail);
    console.log("id in http response: " + key);
  }
  console.log("Print fetched expenses: " + expenses);
  return expenses;
}

export async function deleteExpense(id) {
  console.log(id);
  const response = await axios.delete(
    BACKEND_URL + "/expenses/" + id + ".json"
  );
  return response;
}
export async function updateExpense(id, expenseData) {
  console.log(id);
  const response = await axios.put(
    BACKEND_URL + "/expenses/" + id + ".json",
    expenseData
  );
  return id;
}

export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  return token;
}

export async function createUser(email, password) {
  const token = await authenticate("signUp", email, password);
  return token;
}
export async function login(email, password) {
  const token = await authenticate("signInWithPassword", email, password);
  return token;
}
export async function triggerNetworkScan() {
  try {
    const response = await axios.put(BACKEND_URL + "/networkScanRequest.json", {
      triggerScan: true,
    });
    console.log("Network Scan Requested:");
    console.log(response.data);
  } catch (error) {
    console.error("Error in triggering network scan", error.response.data);
  }
}

export async function fetchDevices() {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  };
  let response;
  try {
    response = await axios.get(BACKEND_URL + '/connected_devices.json');
  } catch (error) {
    console.log('error in fetching');
    console.log(error);
    return [];
  }
  const devices = [];
  for (const key in response.data) {
    devices.push({
      ID: key,
      Name: response.data[key].name,
      IP: response.data[key].ip,
      MAC: response.data[key].mac,
    });
  }
  return devices;
}
export async function deleteDevicesList() {
  const response = await axios.delete(BACKEND_URL + "/connected_devices.json");
  return response;
}

export async function checkScanStatus(){
  const response = await axios.get(BACKEND_URL+"/NetworkScanDone.json");
  // console.error(response.data);
  if (response.data==true){
    const response2=await axios.delete(BACKEND_URL+"/NetworkScanDone.json");
  }

  return response.data;
}
export async function negateStatusDone()
{
  const response = await axios.put(BACKEND_URL+"/NetworkScanDone.json",{
    "Done":false,
  });
  return response;
}

