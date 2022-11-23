"use strict";

//Define userArr function
function userArrDefine() {
  if (localStorage.getItem("USER_ARRAY") === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("USER_ARRAY"));
  }
}

//Define current user function
function currentUserDefine() {
  if (localStorage.getItem("CURRENT_USER") === null) {
    return {};
  } else {
    return JSON.parse(localStorage.getItem("CURRENT_USER"));
  }
}

//Define todoArr function
function todoArrDefine() {
  if (localStorage.getItem("TODO_ARRAY") === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("TODO_ARRAY"));
  }
}
