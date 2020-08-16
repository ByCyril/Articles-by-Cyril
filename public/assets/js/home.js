function pullHomePageData() {
  // prettier-ignore
  firebase.database().ref().orderByChild('timestamp').limitToFirst(3).once('value').then(function(snap) {
      let object = snap.val()
        for (var item in object) {
            // console.log(object[item].content)
            showContent(object[item].content)
        }
    })
}

pullHomePageData();

function showContent(content) {
  $("#main").append("<article class='post'>" + content + "</article>");
}
