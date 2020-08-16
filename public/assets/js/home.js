firebase
  .database()
  .ref()
  .orderByChild("timestamp")
  .limitToLast(3)
  .once("value")
  .then(function (snap) {
    let object = snap.val();
    for (var item in object) {
      $("#main").append(
        "<article class='post'>" + object[item].preview + "</article>"
      );
    }
  })
  .catch(function (err) {
    console.log(err);
  });
