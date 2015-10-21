var name = profile.name;
var username = profile.login;
var avatarURL = profile.avatar_url;
var company = profile.company;
var myLocation = profile.location;
var email = profile.email;
var blog = profile.blog;
var joinedDate = moment(profile.created_at).format("MMM DD, YYYY");
var followers = profile.followers;
var following = profile.following;
//get starred info
var starredNum = starred.length;


//Fill header info
$("title").text(username + " (" + name + ")");
$(".small-avatar").html("<img src = " + avatarURL + "/>");

//Left sidebar
$(".profile").prepend("<img src = " + avatarURL + "/>");
$(".username").text(username);
$(".name").text(name);
$(".company").text(company);
$(".location").text(myLocation);
$(".email").text(email);
$(".blog").text(blog);
$(".joinDate").text(joinedDate);

repos = _.sortBy(repos,function(repo){
  var dt = new Date(repo.updated_at);
  return -dt;
});

// var repoTemplate = _.template("<h3 class = \"title\"<a href=\"  <%- repo.url %-> \"> <%- repo.name %></a></h3>")



//add all the repos
_.each(repos, function (repo) {
  $(".repos").append("<h3 class = \"repo_title\"> <a href= \""
                      + repo.html_url
                      + "\">"
                      + repo.name
                      + "</a></h3><p class = \"repo_data\">Updated "
                      + moment(repo.updated_at).fromNow()
                      + "</p><div class = \"repo_stats\">"
                      + repo.language
                      + "<a href= \""
                      + repo.html_url
                      + "/stargazers\"><span class=\"octicon octicon-star\"></span>"
                      + repo.stargazers_count
                      + "</a><a href= \""
                      + repo.html_url
                      + "/network\"><span class=\"octicon octicon-git-branch\"></span>"
                      + repo.forks_count
                      + "</a>");
});

var activityText="";
//this isn't done
_.each(events, function (currEvent) {
  if(currEvent.type==="PushEvent"){
    activityText = "<span class=\"mega-octicon octicon-git-commit\"></span><div class = \"time\">"
                    + moment(currEvent.created_at).fromNow()
                    + "</div><div class = \"title\">"
                    + currEvent.actor.login
                    + " pushed to "
                    + currEvent.payload.ref.split("/")[2]
                    + " at "
                    + currEvent.repo.name
                    + "</div>"
                    + "<div class = \"details\">"
                    //+ big avatar
                    //+ little avatar
                    + currEvent.payload.head.substring(0,6)
                    + " "
                    + currEvent.payload.commits[0].message;
  }else if (currEvent.payload.ref_type === "repository"){
    activityText = "<span class=\"octicon octicon-repo\"></span>"
                    + currEvent.actor.login
                    + " created repository "
                    + currEvent.repo.name
                    + moment(currEvent.created_at).fromNow()
                    +"<br>";
  }else{
    activityText = "<span class=\"octicon octicon-git-branch\"></span>"
                    + currEvent.actor.login
                    + " created branch "
                    + currEvent.payload.ref.split("/")[2]
                    + " at "
                    + currEvent.repo.name
                    + moment(currEvent.created_at).fromNow()
                    +"<br>";
  }
  $(".activity").append(activityText);
});


$(".repoTab").click(function (event) {
  event.preventDefault();
  $(".repos").css("display","block");
  $(".repos").siblings().css("display","none");
});
$(".contrTab").click(function (event) {
  event.preventDefault();
  $(".contributions").css("display","block");
  $(".contributions").siblings().css("display","none");
});

$(".activTab").click(function (event) {
  event.preventDefault();
  $(".activity").css("display","block");
  $(".activity").siblings().css("display","none");
});
