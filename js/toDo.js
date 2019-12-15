const formToDo = document.querySelector(".js-to-do"),
  inputToDo = formToDo.querySelector(".js-add-to-do");

const pendingCtrl = document.querySelector(".js-pending");
const finishedCtrl = document.querySelector(".js-finished");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

const delBtnResource = "✖️";
const finishedBtnResource = "✔️";
const cancelBtnResource = "⬆️";

let pendingList = [];
let finishedList = [];

function updateLS(localStorageName, list) {
  localStorage.setItem(localStorageName, JSON.stringify(list));
}

function deleteList(li, list, localStorageName) {
  const cleanList = list.filter(el => {
    return el.id !== parseInt(li.id);
  });

  updateLS(localStorageName, cleanList);
  return cleanList;
}

function AddPendingList(text) {
  if (!pendingCtrl) {
    return;
  }
  const newId = pendingList.length + 1;

  const obj = {
    id: newId,
    value: text
  };

  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finishedBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.innerText = delBtnResource;
  finishedBtn.innerText = finishedBtnResource;
  span.innerText = text;
  li.id = newId;

  li.appendChild(span);
  li.appendChild(finishedBtn);
  li.appendChild(delBtn);
  pendingCtrl.appendChild(li);

  // delete btn event
  delBtn.addEventListener("click", e => {
    const li = e.target.parentNode;
    pendingCtrl.removeChild(li);

    pendingList = deleteList(li, pendingList, PENDING_LS);
    updateLS(PENDING_LS, pendingList);
  });

  // finished btn event
  finishedBtn.addEventListener("click", e => {
    const li = e.target.parentNode;

    AddFinishedList(
      pendingList.filter(el => {
        return el.id === parseInt(li.id);
      })[0]
    );

    pendingCtrl.removeChild(li);
    pendingList = deleteList(li, pendingList, PENDING_LS);
    updateLS(PENDING_LS, pendingList);
  });

  pendingList.push(obj);
  updateLS(PENDING_LS, pendingList);
}

function AddFinishedList(obj) {
  if (!finishedCtrl) {
    return;
  }

  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.innerText = delBtnResource;
  cancelBtn.innerText = cancelBtnResource;
  span.innerText = obj.value;
  li.id = obj.id;

  li.appendChild(span);
  li.appendChild(cancelBtn);
  li.appendChild(delBtn);
  finishedCtrl.appendChild(li);

  // delete btn
  delBtn.addEventListener("click", e => {
    const li = e.target.parentNode;
    finishedCtrl.removeChild(li);

    finishedList = deleteList(li, finishedList, FINISHED_LS);
    updateLS(FINISHED_LS, finishedList);
  });

  // cancel btn
  cancelBtn.addEventListener("click", e => {
    const li = e.target.parentNode;

    AddPendingList(
      finishedList.filter(el => {
        return el.id === parseInt(li.id);
      })[0].value
    );

    finishedCtrl.removeChild(li);
    finishedList = deleteList(li, finishedList, FINISHED_LS);
    updateLS(FINISHED_LS, finishedList);
  });

  finishedList.push(obj);
  updateLS(FINISHED_LS, finishedList);
}

function loadData(localStorageName) {
  const loadedLS = localStorage.getItem(localStorageName);
  if (!loadedLS) {
    return;
  }

  const parsedLS = JSON.parse(loadedLS);

  if (localStorageName === PENDING_LS) {
    parsedLS.forEach(el => {
      AddPendingList(el.value);
    });
  } else if (localStorageName === FINISHED_LS) {
    parsedLS.forEach(el => {
      AddFinishedList(el);
    });
  }
}

function init() {
  if (inputToDo) {
    formToDo.addEventListener("submit", e => {
      e.preventDefault();
      AddPendingList(inputToDo.value);

      inputToDo.value = "";
    });
  }

  loadData(PENDING_LS);
  loadData(FINISHED_LS);
}

init();
