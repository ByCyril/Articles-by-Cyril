function queryItemsWith(category) {
  let reference = firebase.database().ref();
  // prettier-ignore
  reference.orderByChild("category").equalTo(category).once("value").then(function (snap) {
    let obj = snap.val()

    if (obj == null) {
      $("#main").append( "<article class='post'><p id='preparingarticle'>Category is empty at the moment ☹️</p></article>");
    }

    for (var item in obj) {
      // prettier-ignore
      $("#main").append("<article class='post'>" + obj[item].preview + "</article>");
    }
      
  });
}
