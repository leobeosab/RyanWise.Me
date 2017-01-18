'use strict';

//Should be fairly explanitory
function getApiData(callback, link) {
  let data = undefined;
  //initial ajax request
  $.ajax({
    crossDomain: true,
    method: "GET",
    contentType: "JSON",
    url: link,
    beforeSend: function(xhr) {
      xhr.withCredentials = true;
    }
  }).done((resp) => callback(resp)).fail((err) => callback(err));
  //make sure we have the data and return it
}
