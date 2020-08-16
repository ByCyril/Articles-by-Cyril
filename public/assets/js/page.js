function readParam() {
  var articleId = location.search.substring(1).split("&");
  return articleId;
}

function pullArticleFromFirebase(articleId) {
  let contentReference = firebase.database().ref(articleId);
  //   prettier-ignore
  contentReference.child("content").once("value").then(function (snap) {
      showContent(snap.val());
  });
  //   prettier-ignore
  contentReference.child('title').once('value').then(function(snap) {
    document.title = snap.val()
  })
}

pullArticleFromFirebase("Test Article Title");

function showContent(content) {
  $(".post").append(content);
}
