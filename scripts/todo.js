"use strict";
//DOM
const taskInput = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");

const currentUser = currentUserDefine();
const isLogin = !currentUser.username ? false : true;

// click Add
addBtn.addEventListener("click", function (e) {
  e.preventDefault;
  if (taskInput.value.replace(" ", "") !== "" && isLogin) {
    const taskObject = new Task(taskInput.value, currentUser.username, false);
    const todoArr = todoArrDefine();
    todoArr.push(taskObject);
    localStorage.setItem("TODO_ARRAY", JSON.stringify(todoArr)); // lưu todo array vào local storage
    renderTasks(currentUser.username); //hiển thị
  }
});

// render task list theo username
function renderTasks(username) {
  todoList.innerHTML = "";
  const todoArr = todoArrDefine();
  function check(todo) {
    return todo.owner === username;
  }
  const todoArrFilter = todoArr.filter(check); // filter theo điều kiện todo.owner === username
  todoArrFilter.forEach((mov, i) => {
    const li = document.createElement("li"); // tạo  <li>
    todoList.append(li);
    li.innerHTML = mov.task;
    // nếu mov.isDone === true thì <li> có .checked
    if (mov.isDone === true) {
      li.classList.add("checked");
    } else {
      li.classList.remove("checked");
    }
    // click <li>
    li.addEventListener("click", function (e) {
      e.preventDefault;
      li.classList.toggle("checked");
      mov.isDone = mov.isDone === true ? false : true;
      function checkTaskOwner(todo) {
        return todo.owner === mov.owner && todo.task === mov.task;
      }
      // Thay đổi isDone trong todo array và lưu vào local storage
      todoArr[todoArr.findIndex(checkTaskOwner)].isDone = mov.isDone;
      localStorage.setItem("TODO_ARRAY", JSON.stringify(todoArr));
    });
    // Tạo <span>
    const span = document.createElement("span");
    li.append(span);
    span.classList.add("close");
    span.innerHTML = "×";
    // click nút x
    span.addEventListener("click", function (e) {
      e.preventDefault;
      function checkTaskOwner(todo) {
        return todo.owner === mov.owner && todo.task === mov.task;
      }
      // Xóa task tương ứng trong todo array và lưu vào local storage
      todoArr.splice(todoArr.findIndex(checkTaskOwner), 1);
      localStorage.setItem("TODO_ARRAY", JSON.stringify(todoArr));
      renderTasks(username);
    });
  });
}

// render task list khi load trang
window.addEventListener("load", renderTasks(currentUser.username));
