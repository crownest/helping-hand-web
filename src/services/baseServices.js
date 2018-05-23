// Constants
import { changeCase } from 'constants/baseConstants';


export function setAuthInformations(auth_token, user_id) {
  if (auth_token && user_id) {
    localStorage.setItem("auth_token", auth_token);
    localStorage.setItem("user_id", user_id);

    return true;
  } else {
    return false;
  }
}


export function getAuthInformations() {
  var auth_informations = {
    "auth_token": localStorage.getItem("auth_token"),
    "user_id": localStorage.getItem("user_id")
  }

  return auth_informations
}


export function removeAuthInformations() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_id");
}


export function isAuthentication() {
  var auth_token = localStorage.getItem("auth_token");
  var user_id = localStorage.getItem("user_id");

  if (auth_token && user_id) {
    return true;
  } else {
    return false;
  }
}


export function camelCaseDictKey(dict) {
  var new_dict = {}

  for (var key in dict) {
    new_dict[changeCase.camelCase(key)] = dict[key];
  }

  return new_dict
}


export function camelCaseArrayDictKey(array) {
  var new_array = []

  for (var index in array) {
    new_array.push(camelCaseDictKey(array[index]))
  }

  return new_array
}
