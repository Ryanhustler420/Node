
function deparam(url){
  // var uri = window.location.search; || url
  var queryString = {};
  var newUrl = url.replace(new RegExp("([^?=&]+)(=([^&#]*))?", "g"),function($0, $1, $2, $3) {
              queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
              });
  return queryString;
}
