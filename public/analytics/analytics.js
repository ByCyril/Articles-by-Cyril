var config = {
  apiKey: "AIzaSyC7ppADXgTCbapJWJho57NZpukEfVUvha4",
  authDomain: "articles-by-cyril.firebaseapp.com",
  databaseURL: "https://articles-by-cyril.firebaseio.com",
  projectId: "articles-by-cyril",
  storageBucket: "articles-by-cyril.appspot.com",
  messagingSenderId: "228302831585"
};
firebase.initializeApp(config);
var database = firebase.database();

function getDocumentTitle() {
  return document.title;
}

function timestamp() {
  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var timestamp;

  if (hour > 12) {
    hour = hour - 12;
    timestamp = month + "/" + day + "/" + year + " " + hour + ":" + min + "PM";
  } else {
    timestamp = month + "/" + day + "/" + year + " " + hour + ":" + min + "AM";
  }

  return timestamp;
}

function updateVisitCount(title, count) {
  database.ref(title).set({
    visits: count,
    lastVisit: timestamp()
  });
  this.displayStats(count);
}

function getTotalVisits(title) {
  database
    .ref(title)
    .once("value")
    .then(function(snapshot) {
      if (snapshot.val() == null) {
        this.updateVisitCount(title, 1);
      } else {
        var count = snapshot.val().visits;

        if (document.cookie != "uid=" + document.title) {
          this.spu_createCookie();
          this.updateVisitCount(title, count + 1);
        } else {
          this.displayStats(count);
        }
      }
    });
}

function spu_createCookie() {
  console.log("here");
  var value = document.title;

  var date = new Date();
  date.setTime(date.getTime() + 60 * 60 * 1000);
  var expires = "; expires=" + date.toGMTString();
  document.cookie = "uid=" + value + expires + "; path=/";
  console.log("created cookies", document.cookie);
}

function displayStats(count) {
  document.getElementById("stats").innerHTML = "Visits: " + count;
}

getTotalVisits(document.title);
console.log("cookies", document.cookie);
