let articleId = location.search.split("?")[1];
let contentReference = firebase.database().ref(articleId);

//   prettier-ignore
contentReference.child('title').once('value').then(function(snap) {
  if (snap.val() == null) {
    document.title = "No Article Found ☹️"
  } else {
    document.title = snap.val()
  }
})

//   prettier-ignore
contentReference.child("content").once("value").then(function (snap) {
  if (snap.val() == null) {
    $('#preparingarticle').text('No Article Found ☹️')
  } else {
    $('#preparingarticle').remove()
    $(".post").append(snap.val());
  }
});
