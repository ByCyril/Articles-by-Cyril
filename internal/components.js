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

function createBody(text) {
  return `<p>${text}</p>`;
}

function createHeader(type, text) {
  return `<${type}>${text}</${type}>`;
}

function createCode(text) {
  return `<pre><code>${text}</code></pre>`;
}
