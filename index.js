//TODO: Command 수정기능
//TODO: Comment 수정기능
//TODO: Copy 기능
//TODO: New category 기능 (O)
//TODO: Command 추가기능 (O)
//TODO: Command 삭제기능 (O)
//TODO: Comment 삭제기능
//TODO: Command 이동기능
//TODO: 추가기능
//TODO: 접는기능

var categories = [];

function newCategory(category_name) {
  // div class="category"
  if (category_name == null) {
    var new_title = prompt("카테고리의 제목을 입력해주세요");
    // category 이름이 없을 경우
    if (new_title == null) {
      return;
    }
    if (new_title == "") {
      alert('category 이름이 없습니다.');
      return;
    }
    // category 이름이 이미 존재하는 경우
    if (localStorage.getItem("category_" + new_title)) {
      alert('이미 존재하는 Category 입니다.');
      return;
    }
    var key = "category_" + new_title;
    localStorage.setItem(key, new_title);
  }

  var div = document.createElement("div");
  var str = " category_" + (category_name ? category_name : new_title);
  div.setAttribute("class", "category" + str);
  ////////////////////////////////////////////////////////header
  var category_header = document.createElement("div");
  category_header.setAttribute("class", "category_header");

  var bars = document.createElement("i");
  bars.setAttribute("class", "fas fa-bars");
  bars.setAttribute("onclick", "toggle(this)");

  var category_title = document.createElement("span");
  category_title.setAttribute("class", "category_title");

  category_title.innerHTML = category_name ? category_name : new_title;

  var plus_circle = document.createElement("i");
  plus_circle.setAttribute("class", "fas fa-plus-circle");
  plus_circle.setAttribute("onclick", "newItem(this)");

  var trash = document.createElement("i");
  trash.setAttribute("class", "fas fa-trash-alt");
  trash.setAttribute("onclick", "deleteCategory(this)");

  category_header.appendChild(bars);
  category_header.appendChild(category_title);
  category_header.appendChild(trash);
  category_header.appendChild(plus_circle);

  var category_body = document.createElement("div");
  category_body.setAttribute("class", "category_body");
  ////////////////////////////////////////////////////////header
  div.appendChild(category_header);
  div.appendChild(category_body);
  var category_container = document.getElementById("category_container");
  category_container.appendChild(div);
}

function newItem(obj, key) {
  var parent_node = obj.parentNode;
  var category_body = parent_node.nextElementSibling;
  ////////////////////////////////////////////////////////body
  if (!key) {
    var key = category_body.parentNode.className.split(" ")[1].split("_")[1];
    key += "_command_" + Math.floor(Math.random() * 1000);
    while (localStorage.getItem(key)) {
      key += Math.floor(Math.random() * 1000);
    }
  }

  var category_item = document.createElement("div");
  category_item.setAttribute("class", "category_item");

  var category_command = document.createElement("div");
  category_command.setAttribute(
    "class",
    "category_command" + (key ? " " + key : "")
  );

  var copy_button = document.createElement("button");
  copy_button.setAttribute("class", "copy_button");
  copy_button.setAttribute('onclick', "copyToClipboard(this)");
  copy_button.innerHTML = "copy";

  var command_text = document.createElement("span");
  command_text.setAttribute("class", "command_text");
  // 수정가능
  command_text.setAttribute('contenteditable', 'false');
  command_text.setAttribute("onkeydown", "enterOnEdit(this, event)");
  command_text.setAttribute("onblur", "saveCommand(this)");

  var edit1 = document.createElement("i");
  edit1.setAttribute("class", "fas fa-edit");
  edit1.setAttribute("onclick", "editCommand(this)");


  var edit2 = document.createElement("i");
  edit2.setAttribute("class", "fas fa-edit");
  edit2.setAttribute("onclick", "editCommand(this)");

  var trash = document.createElement("i");
  trash.setAttribute("class", "fas fa-trash-alt");
  trash.setAttribute("onclick", "deleteItem(this)");

  //////////////////////////////////
  var category_comment = document.createElement("div");
  category_comment.setAttribute(
    "class",
    "category_comment" + (key ? " " + key.replace("command", "comment") : "")
  );

  var comment_text = document.createElement("span");
  comment_text.setAttribute("class", "comment_text");
  comment_text.setAttribute('contenteditable', 'false');
  comment_text.setAttribute("onkeydown", "enterOnEdit(this, event)");
  comment_text.setAttribute("onblur", "saveCommand(this)");

  category_body.appendChild(category_item);
  category_item.appendChild(category_command);
  category_command.appendChild(copy_button);
  category_command.appendChild(command_text);
  category_command.appendChild(trash);
  category_command.appendChild(edit1);

  category_comment.appendChild(comment_text);
  category_comment.appendChild(edit2);
  category_item.appendChild(category_comment);

  localStorage.setItem(key, command_text.innerHTML);
  key = key.replace("command", "comment");
  localStorage.setItem(key, comment_text.innerHTML);
}

function readItem(obj, key) {
  ////////////////////////////////////////////////////////body
  var category_body = obj.childNodes[1];

  var category_item = document.createElement("div");
  category_item.setAttribute("class", "category_item");

  var category_command = document.createElement("div");
  category_command.setAttribute(
    "class",
    "category_command" + (key ? " " + key : "")
  );

  var copy_button = document.createElement("button");
  copy_button.setAttribute("class", "copy_button");
  copy_button.setAttribute('onclick', "copyToClipboard(this)");
  copy_button.innerHTML = "copy";

  var command_text = document.createElement("span");
  command_text.setAttribute("class", "command_text");
  command_text.setAttribute('contenteditable', 'false');
  command_text.setAttribute("onkeydown", "enterOnEdit(this, event)");
  command_text.setAttribute("onblur", "saveCommand(this)");
  command_text.innerHTML = (key ? localStorage.getItem(key) : "");

  var edit1 = document.createElement("i");
  edit1.setAttribute("class", "fas fa-edit");
  edit1.setAttribute("onclick", "editCommand(this)");

  var edit2 = document.createElement("i");
  edit2.setAttribute("class", "fas fa-edit");
  edit2.setAttribute("onclick", "editCommand(this)");

  var trash = document.createElement("i");
  trash.setAttribute("class", "fas fa-trash-alt");
  trash.setAttribute("onclick", "deleteItem(this)");

  //////////////////////////////////
  var category_comment = document.createElement("div");
  category_comment.setAttribute(
    "class",
    "category_comment" + (key ? " " + key.replace("command", "comment") : "")
  );

  var comment_text = document.createElement("span");
  comment_text.setAttribute("class", "comment_text");
  comment_text.setAttribute('contenteditable', 'false');
  comment_text.setAttribute("onkeydown", "enterOnEdit(this, event)");
  comment_text.setAttribute("onblur", "saveCommand(this)");
  comment_text.innerHTML = (key ? localStorage.getItem(key.replace("command", "comment")) : "");

  category_body.appendChild(category_item);
  category_item.appendChild(category_command);
  category_command.appendChild(copy_button);
  category_command.appendChild(trash);
  category_command.appendChild(command_text);
  category_command.appendChild(edit1);

  category_comment.appendChild(comment_text);
  category_comment.appendChild(edit2);
  category_item.appendChild(category_comment);
}

function deleteCategory(obj) {
  var response = confirm("정말로 Category를 삭제하시겠습니까?\n모든 Command와 Comment도 삭제됩니다.");
  if (response == false)
    return;
  var parent_node = obj.parentNode.parentNode.parentNode;
  var key = obj.parentNode.parentNode.className.split(" ")[1];
  parent_node.removeChild(obj.parentNode.parentNode);
  // category를 localStorage에서 삭제
  localStorage.removeItem(key);

  // commands, comments를 localStorage에서 삭제
  var key_str = key.split("_")[1];
  var key_len = key_str.length;
  var len = localStorage.length;
  var key_array = [];
  for (var i = 0; i < len; i++) {
    if (
      localStorage.key(i).indexOf(key_str + "_") != -1 &&
      localStorage.key(i).substr(0, key_len + 1) == key_str + "_"
    )
      key_array.push(localStorage.key(i));
  }
  for (var i = 0; i < key_array.length; i++) {
    localStorage.removeItem(key_array[i]);
  }
}

function deleteItem(obj) {
  var response = confirm("정말로 Command를 삭제하시겠습니까?");
  if (response == false)
    return;
  var parent_node = obj.parentNode.parentNode.parentNode;
  var key = obj.parentNode.className.split(" ")[1];
  parent_node.removeChild(obj.parentNode.parentNode);
  localStorage.removeItem(key);
  localStorage.removeItem(key.replace("command", "comment"));
}

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  } else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos(input, pos) {
  setSelectionRange(input, pos, pos);
}

function editCommand(obj) {
  var node = obj.previousElementSibling
  if (node.isContentEditable) {
    node.contentEditable = 'false';
    var str = node.innerHTML;
    localStorage.setItem(node.parentNode.className.split(" ")[1], str);
  } else {
    node.contentEditable = 'true';
    var len = node.innerHTML.length;
    node.focus();
    if (len != 0) {
      var sel = window.getSelection();
      sel.collapse(node.firstChild, len);
    }
  }
}

function enterOnEdit(obj, e) {
  // Enter키를 누르면 <br>대신 데이터 저장
  if (e.keyCode == 13) {
    e.preventDefault();
    localStorage.setItem(obj.parentNode.className.split(" ")[1], obj.innerHTML);
    obj.contentEditable = 'false';
  }
}

function saveCommand(obj) {
  var str = obj.innerHTML;
  localStorage.setItem(obj.parentNode.className.split(" ")[1], str);
  obj.contentEditable = 'false';
}

function copyToClipboard(obj) {
  var node = obj.nextElementSibling;
  var str = node.innerHTML;
  var textArea = document.createElement("textarea");
  textArea.value = str;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.blur();
  textArea.remove();
}

function toggle(obj) {
  var node = obj.parentNode.nextElementSibling;
  if (node.style.display == "none")
    node.style.display = "inline";
  else
    node.style.display = "none";
}

function init() { // FIXME: categories를 배열로 만들어서 storage에 저장해놔서 순서지켜주기
  // localStorage에서 categories 읽기
  if (!window.localStorage) {
    alert(
      "localStorage를 지원하지 않는 브라우저입니다. 다른 브라우저를 이용해 주세요."
    );
    return;
  } else {
    for (var i = localStorage.length - 1; i > 0; i--) {
      if (localStorage.key(i).substr(0, 8) == "category") {
        categories[categories.length] = localStorage.key(i).split("_")[1];
      }
    }
  }
  // categories 생성
  for (var i = 0; i < categories.length; i++) {
    newCategory(categories[i]);
    var command_prefix = categories[i] + "_command_";
    var comment_prefix = categories[i] + "_comment_";
    var class_name = "category_" + categories[i];
    var node = document.getElementsByClassName(class_name)[0];
    for (var j = 0; j < localStorage.length; j++) {
      if (localStorage.key(j).indexOf(command_prefix) != -1) {
        readItem(node, localStorage.key(j));
      }
    }
  }
}

window.onload = init;