function save() {
  var todo = document.getElementById("todo").innerHTML;
  var doing = document.getElementById("doing").innerHTML;
  var done = document.getElementById("done").innerHTML;

  localStorage.setItem("todo", todo);
  localStorage.setItem("doing", doing);
  localStorage.setItem("done", done);
}

function load() {
  var todo = localStorage.getItem("todo");
  var doing = localStorage.getItem("doing");
  var done = localStorage.getItem("done");

  if (todo) document.getElementById("todo").innerHTML = todo;
  if (doing) document.getElementById("doing").innerHTML = doing;
  if (done) document.getElementById("done").innerHTML = done;

  addEventListenersToButtons("todo");
  addEventListenersToButtons("doing");
  addEventListenersToButtons("done");
}

function add() {
  var ul = document.getElementById("todo");
  var li = document.createElement("li");

  var input = document.getElementById("input").value;
  var textNode = document.createTextNode(input + " ");
  li.appendChild(textNode);

  if (input === "") return;

  var del = document.createElement("button");
  del.innerHTML = "&#10006;";
  del.onclick = function () {
    moveToDoing(input, li);
  };
  li.appendChild(del);

  ul.appendChild(li);

  document.getElementById("input").value = "";
  save();
}

function moveToDoing(task, listItem) {
  var doing = document.getElementById("doing");
  var doingLi = document.createElement("li");
  var textNode = document.createTextNode(task + " ");
  doingLi.appendChild(textNode);

  var del = document.createElement("button");
  del.innerHTML = "&#10006;";
  del.onclick = function () {
    moveToDone(task, doingLi);
  };
  doingLi.appendChild(del);

  doing.appendChild(doingLi);
  var ul = document.getElementById("todo");
  ul.removeChild(listItem);

  save();
}

function moveToDone(task, listItem) {
  var done = document.getElementById("done");
  var doneLi = document.createElement("li");
  var textNode = document.createTextNode(task + " ");
  doneLi.appendChild(textNode);

  var del = document.createElement("button");
  del.innerHTML = "&#10006;";
  del.onclick = function () {
    done.removeChild(doneLi);
  };
  doneLi.appendChild(del);

  done.appendChild(doneLi);
  var doing = document.getElementById("doing");
  doing.removeChild(listItem);

  save();
}

function addEventListenersToButtons(listId) {
  var list = document.getElementById(listId);
  var buttons = list.getElementsByTagName("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = (function(i) {
      return function() {
        var li = buttons[i].parentNode;
        var task = li.childNodes[0].textContent.trim();
        if (listId === "todo") {
          moveToDoing(task, li);
        } else if (listId === "doing") {
          moveToDone(task, li);
        } else if (listId === "done") {
          list.removeChild(li);
          save();
        }
      }
    })(i);
  }
}

document.getElementById("input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    add();
  }
});

load();
