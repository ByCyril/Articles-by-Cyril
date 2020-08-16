let articleId = location.search.split("?")[1];
let contentReference = firebase.database().ref(articleId);
//   prettier-ignore
contentReference.child("content").once("value").then(function (snap) {
    $(".post").append(snap.val());
  });
//   prettier-ignore
contentReference.child('title').once('value').then(function(snap) {
    document.title = snap.val()
  })
