var blockNum = -1;
var elementBody = $("#elementbody");
var previewBody = $("#previewbody");
var thread = {};

var config = {
  apiKey: "AIzaSyCu5Lyblgz7TgaoKS-Vp4zUcuRYN4pJG64",
  authDomain: "ba-baam.firebaseapp.com",
  databaseURL: "https://ba-baam.firebaseio.com",
  projectId: "ba-baam",
  storageBucket: "ba-baam.appspot.com",
  messagingSenderId: "772210314286",
  appId: "1:772210314286:web:277fa2eb174540088b63bf",
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function init() {
  // authenticate();
}

function authenticate() {
  //   prettier-ignore
  firebase.auth().signInWithEmailAndPassword("admin@admin.como", "123321").then(function(succ) {
    $("#toolbar").show();
  }).catch(function (err) {
    $("#toolbar").hide();
  });
}

function addHeader() {
  blockNum += 1;
  //   prettier-ignore
  elementBody.append("<input class='element' id='header-" + blockNum + "' placeholder='Header'></input>");
}

function addBody() {
  blockNum += 1;
  //   prettier-ignore
  elementBody.append("<textarea class='element' id='body-" + blockNum + "' placeholder='Body'></textarea>");
}

function addCode() {
  blockNum += 1;
  //   prettier-ignore
  elementBody.append("<textarea class='element' id='code-" + blockNum + "' placeholder='Code'></textarea>");
}

var firstBody = "";
function preview() {
  var content = "";
  thread = {};

  document.getElementById("previewbody").innerHTML = "";
  // prettier-ignore
  let elements = document.getElementById("elementbody").querySelectorAll("input, textarea");
  console.log(elements.length);
  for (var i = 0; i < elements.length; i++) {
    var value = elements[i].value;
    let id = elements[i].id;
    let type = id.split("-")[0];

    if (type == "body") {
      content += "<p>" + value + "</p>";
    } else if (type == "code") {
      content += "<pre><code>" + value + "</code></pre>";
    } else if (type == "header") {
      content += "<h3>" + value + "</h3>";
    }
  }

  var articleTitle = document.getElementById("title").value;
  var subtitle = document.getElementById("subtitle").value;
  var firstBody = document.getElementById("body-0").value;
  let title = createTitle(articleTitle, subtitle);
  let category = document.getElementById("category").value;

  let preview = createHomePagePreview(articleTitle, firstBody, subtitle);
  var ts = Math.round(new Date().getTime() / 1000);
  content = title + content;

  thread = {
    content: content,
    title: articleTitle,
    preview: preview,
    timestamp: ts,
    category: category,
  };
}

function timestamp() {
  // prettier-ignore
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = months[today.getMonth()];
  var yyyy = today.getFullYear();

  let t = yyyy + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + dd;
  let todayStr = mm + " " + dd + ", " + yyyy;

  return [todayStr, t, today];
}

function createTitle(title, subtitle) {
  let publishDate = timestamp()[0];
  return `<header><div class='title'><h2><a href='#'>${title}</a></h2><p>${subtitle}</p></div><div class='meta'><time class='published' datetime='${
    timestamp()[1]
  }'>${publishDate}</time><a href='#' class='author'><span class='name'>Cyril Garcia</span><img src='images/avatar.jpg' alt=''/></a></div></header>`;
}

function post() {
  preview();
  if (confirm("Confirm to Post!")) {
    let value = document.getElementById("title").value;
    database.ref(dash(value)).set(thread);
  }
}

function createFooter(articleId) {
  return `<footer><ul class='actions'><li><a href='view.html?${articleId}' class='button large'>Continue Reading</a></li></ul></footer>`;
}

function createHomePagePreview(title, body, subtitle) {
  var preview = "<article class='post'>";
  let articleTitle = createTitle(title, subtitle);
  let footer = createFooter(dash(title)) + "</article>";

  preview = articleTitle + "<p>" + body + "</p>" + footer;

  return preview;
}

function dash(value) {
  var articleTitle = "";
  for (var x in value) {
    let c = value.charAt(x);
    if (c == " ") {
      articleTitle += "-";
    } else {
      articleTitle += c;
    }
  }
  return articleTitle;
}

init();
