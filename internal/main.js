var blockNum = -1;
var elementBody = $("#elementbody");
var previewBody = $("#previewbody");
var thread = {};
var articleTitle = "";

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

function addTitle() {
  blockNum += 1;
  //   prettier-ignore
  elementBody.append("<input class='element' id='title-" + blockNum + "' placeholder='Title'></input>");
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

function addQuote() {
  blockNum += 1;
  //   prettier-ignore
  elementBody.append("<textarea class='element' id='quote-" + blockNum + "' placeholder='body'></textarea>");
}

function addReference() {
  blockNum += 1;
  //   prettier-ignore
  elementBody.append("<input class='element' id='reference-" + blockNum + "' placeholder='Reference'></textarea>");
}

function preview() {
  var content = "";
  thread = {};
  document.getElementById("previewbody").innerHTML = "";
  // prettier-ignore
  let elements = document.getElementById("elementbody").querySelectorAll("input, textarea");

  for (var i = 0; i < elements.length; i++) {
    var value = elements[i].value;
    let id = elements[i].id;
    let type = id.split("-")[0];

    if (i == 0) {
      articleTitle = value;
    }
    if (type == "title") {
      content += createTitle(value, "some subtitle");
    } else if (type == "body") {
      content += "<p>" + value + "</p>";
    } else if (type == "code") {
      content += "<pre><code>" + value + "</code></pre>";
    }
  }
  let preview = createFooter(articleTitle, null, "some stuff");
  thread = { content: content, title: articleTitle, preview: preview };
}

function timestamp() {
  // prettier-ignore
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = months[today.getMonth()];
  var yyyy = today.getFullYear();

  let t = yyyy + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + dd;
  today = mm + " " + dd + ", " + yyyy;

  return [today, t];
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
    database.ref(articleTitle).set(thread);
  }
}

function createFooter(articleId) {
  return "<footer><ul class='actions'><li><a href='${articleId}' class='button large'>Continue Reading</a></li></ul></footer>";
}

function createHomePagePreview(title, image, body) {
  var preview = "<article class='post'>";
  let articleTitle = createTitle(title, "some subtitle");
  let footer = createFooter(title) + "</article>";

  preview += articletitle;
  preview += body;
  preview += footer;
  return preview;
}

function addImage() {}

init();

// <article class="post">
// <header>
//   <div class="title">
//     <h2><a href="single.html">Magna sed adipiscing</a></h2>
//     <p>Lorem ipsum dolor amet nullam consequat etiam feugiat</p>
//   </div>
//   <div class="meta">
//     <time class="published" datetime="2015-11-01"
//       >November 1, 2015</time
//     >
//     <a href="#" class="author"
//       ><span class="name">Jane Doe</span
//       ><img src="images/avatar.jpg" alt=""
//     /></a>
//   </div>
// </header>
// <a href="single.html" class="image featured"
//   ><img src="images/pic01.jpg" alt=""
// /></a>
// <p>
//   Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl.
//   Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna
//   enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non
//   congue ullam corper. Praesent tincidunt sed tellus ut rutrum. Sed
//   vitae justo condimentum, porta lectus vitae, ultricies congue
//   gravida diam non fringilla.
// </p>
// <footer>
//   <ul class="actions">
//     <li>
//       <a href="single.html" class="button large">Continue Reading</a>
//     </li>
//   </ul>
//   <ul class="stats">
//     <li><a href="#">General</a></li>
//     <li><a href="#" class="icon solid fa-heart">28</a></li>
//     <li><a href="#" class="icon solid fa-comment">128</a></li>
//   </ul>
// </footer>
// </article> -->
