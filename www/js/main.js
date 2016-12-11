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
      template: '<li> <span class="date"> {{event.date}} </span>, <br> <a v-bind:href="event.repoUrl" target="_blank">{{event.message}}</a></li>'
  });
  vueElements.github = new Vue({
    el: "#github",
    data: {
      eventList: []
    }
  });

  Vue.component('hackerrank-challenge', {
      props:['challenge'],
      template: '<li> <span class="date"> {{challenge.date}} </span> - <span class="user"> Ryan </span> completed <a v:bind:href="challenge.url" target="_blank"> {{event.name}}</a></li>'
  });
  vueElements.hackerrank = new Vue({
    el: "#hackerrank",
    data: {
      challengeList: []
    }
  })

  //get our gitdata
  getApiData(githubCallback, "https://api.github.com/users/leobeosab/events");
  //get out hackerrank data doesn't allow cors
  //getApiData(hackerrankCallback, "https://www.hackerrank.com/rest/hackers/ryan_wise_asm/recent_challenges?offset=0&limit=15")
}

const months = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

function githubCallback(data) {
  //prepare array
  console.log(data);
  let gitData = [];
  //format our data
  for (let key of data) {
        const dateobj = new Date(key.created_at);
        const date = months[dateobj.getMonth()] + " " + dateobj.getDate() +" " + dateobj.getFullYear();
        const url =  "https://github.com/" + key.repo.name;
        const name = key.repo.name.replace("leobeosab/", "");
        if (key.type == "PushEvent") {
        gitData.push( {
        action: "push",
        date: date,
        repoUrl: url,
        message: "pushed to " + name
        });
        } else if (key.type == "CreateEvent") {
          if (key.payload.ref_type == "repository") {
            gitData.push({
              action: "repo-create",
              date: date,
              repoUrl: url,
              message: "created a new repository, " + name
            });
          } else if (key.payload.ref_type == "branch") {
            gitData.push({
              action: "branch-create",
              date: date,
              repoUrl: url,
              message: "created a new branch, " + key.payload.ref + ", on " + name
            });
          }
        }
    }
    //put it in a vue element
    vueElements.github.$data.eventList = gitData;
}

function hackerrankCallback(data) {
  let hrData = [];
  for (let key of data) {
    const dateobj = new Date(key.created_at);
    const date = months[dateobj.getMonth()] + " " + dateobj.getDate() +" " + dateobj.getFullYear();
    const link = "https://hackerrank.com/" + key.url;
    hrData.push({
      name: key.name,
      date: date,
      link: link
    });
  }
  vueElements.hackerrank.$data.challengeList = hrData;
}
