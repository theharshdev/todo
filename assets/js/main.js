const changeTheme = document.getElementById("changeTheme");
const html = document.querySelector("html");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const taskInput = document.getElementById("taskInput");
const listContaienr = document.getElementById("listContaienr");
const error = document.getElementById("error");
let darkTheme = true;

changeTheme.addEventListener("click", () => {
  if (darkTheme) {
    html.classList.add("dark");
    document.cookie = "darkMode = darkModeOn; max-age =" + 60 * 60 * 24 * 365;
    changeTheme.innerHTML =
      '<i class="bi bi-brightness-high text-base leading-3"></i>';
    darkTheme = false;
  } else {
    html.classList.remove("dark");
    document.cookie = "darkMode = ";
    changeTheme.innerHTML = '<i class="bi bi-moon-stars leading-3"></i>';
    darkTheme = true;
  }
});

window.addEventListener("load", () => {
  if (document.cookie.includes("darkModeOn")) {
    html.classList.add("dark");
    changeTheme.innerHTML =
      '<i class="bi bi-brightness-high text-base leading-3"></i>';
    darkTheme = false;
  } else {
    html.classList.remove("dark");
    changeTheme.innerHTML = '<i class="bi bi-moon-stars leading-3"></i>';
    darkTheme = true;
  }
});

saveTaskBtn.addEventListener("click", () => {
  if (taskInput.value === "") {
    error.innerHTML = "Please! enter any task.";
  } else {
    error.innerHTML = "";
    const taskTxt = taskInput.value;
    const li = document.createElement("li");
    const innerCode = `<div class="py-3 px-4 lg:hover:bg-zinc-300/70 lg:dark:hover:bg-zinc-700/50 cursor-pointer"><div class="flex w-full justify-between items-center"><div class="flex w-[90%] items-center"><i class="bi bi-circle-fill text-xl text-zinc-300/50 dark:text-zinc-700/60 pe-2 taskDot"></i><i class="bi bi-check-circle text-xl text-violet-600 pe-2 hidden taskCheckIcon"></i><span>${taskTxt}</span></div><button class="deleteTaskBtn text-lg text-zinc-800 dark:text-white w-7 h-7 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-700 leading-3" type="button"><i class="bi bi-x deleteTaskBtn"></i></button></div></div>`;
    li.innerHTML = innerCode;
    listContaienr.appendChild(li);
    taskInput.value = "";
  }
  saveToLocal();
});

listContaienr.addEventListener("click", (event) => {
  let target = event.target;
  let task = target.closest("li");
  if (
    (target.tagName != "" &&
      target.tagName != "I" &&
      target.tagName != "BUTTON") ||
    target.classList.contains("taskCheckIcon") ||
    target.classList.contains("taskDot")
  ) {
    task.classList.toggle("listItem");
    saveToLocal();
  } else if (
    target.tagName === "I" &&
    target.classList.contains("deleteTaskBtn")
  ) {
    listContaienr.removeChild(task);
    saveToLocal();
  } else if (
    target.tagName === "BUTTON" &&
    target.classList.contains("deleteTaskBtn")
  ) {
    listContaienr.removeChild(task);
    saveToLocal();
  }
});

function saveToLocal() {
  localStorage.setItem("task", listContaienr.innerHTML);
}

window.addEventListener("load", () => {
  listContaienr.innerHTML = localStorage.getItem("task");
});
