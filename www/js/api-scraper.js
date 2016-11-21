'use strict';

//Should be fairly explanitory
function getGithubDetails(callback) {
  let data = undefined;
  //initial ajax request
  $.ajax({
    method: "GET",
    contentType: "JSON",
    url: "https://api.github.com/users/leobeosab/events"
  }).done((resp) => callback(resp)).fail((err) => callback(err));
  //make sure we have the data and return it
}
