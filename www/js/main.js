'use strict';

//init on document's ready
$(document).ready(()=>init());

//used to hold all of the vue elements
var vueElements = {}

function init() {
  //Grab svg for arrow animations
  $(".arrow").load("img/arrow.svg")

  //vue component setups
  Vue.component('git-event', {
      props:['event'],
      template: '<li> <span class="user">Ryan</span>: <a v-bind:href="event.repoUrl" target="_blank">{{event.message}}</a></li>'
  });
  vueElements.github = new Vue({
    el: "#github",
    data: {
      eventList: []
    }
  });

  //get our gitdata
  getGithubDetails(githubCallback);
}

function githubCallback(data) {
  //prepare array
  let gitData = [];
  //format our data
  for (let key of data) {
        if (key.type == "PushEvent") {
        gitData.push( {
        action: "push",
        repoUrl: "https://github.com/" + key.repo.name,
        message: "pushed to " + (key.repo.name).replace("leobeosab/", "")
        });
        } else if (key.type == "CreateEvent") {
          if (key.payload.ref_type == "repository") {
            gitData.push({
              action: "repo-create",
              repoUrl: key.repo.url,
              message: "created a new repository, " + (key.repo.name).replace("leobeosab/", "")
            });
          } else if (key.payload.ref_type == "branch") {
            gitData.push({
              action: "branch-create",
              repoUrl: key.repo.url,
              message: "created a new branch, " + key.payload.ref + ", on " + (key.repo.name).replace("leobeosab/", "")
            });
          }
        }
    }
    //put it in a vue element
    vueElements.github.$data.eventList = gitData;
}
