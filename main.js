var name = profile.name;
var username = profile.login;
var avatarURL = profile.avatar_url;
var company = profile.company;
var myLocation = profile.location;
var email = "<a href = \"mailto:"+ profile.email+ "\">" + profile.email + "</a>";
var blog = "<a href = \""+ profile.blog+ "\">" + profile.blog + "</a>";
var joinedDate = moment(profile.created_at).format("MMM DD, YYYY");
var followers = profile.followers;
var following = profile.following;
var starredNum = starred.length;


//Fill header info
$("title").text(username + " (" + name + ")");
$(".small-avatar").html("<img src = " + avatarURL + "/>");

//Left sidebar
$(".profile").prepend("<img src = " + avatarURL + "/>");
$(".username").text(username);
$(".name").text(name);
$(".company").html("<span class=\"octicon octicon-organization\"></span>"+company);
$(".location").html("<span class=\"octicon octicon-location\"></span>"+myLocation);
$(".email").html("<span class=\"octicon octicon-mail\"></span>"+email);
$(".blog").html("<span class=\"octicon octicon-link\"></span>"+blog);
$(".joinDate").html("<span class=\"octicon octicon-clock\"></span>"+joinedDate);

//profile stats:
$(".stats").html("<a class = \"statLink\" href = "
                 + profile.html_url
                 + "/followers >"
                 + followers
                 + "Followers</a><a class = \"statLink\" href = https://github.com/stars/"
                 + profile.login
                 + ">"
                 + starredNum
                 + "Stars</a><a class = \"statLink\" href = "
                 + profile.html_url
                 + "/following >"
                 + following
                 + "Following</a>"
               );

 //profile orgs:
 var orgText=""

 _.each(orgs, function(org){
   orgText += "<a href = \"http://github.com/"
           + org.login
           + "\"><img src = \""
           + org.avatar_url
           + "\"></a>";
 });

 $(".orgs").html(orgText);


//sort repos by date so the newest is first
repos = _.sortBy(repos,function(repo){
  var dt = new Date(repo.updated_at);
  return -dt;
});

//add all the repos
_.each(repos, function (repo) {
  $(".repos").append("<div class = \"repo\"><h3 class = \"repo_title\"> <a href= \""
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
                      + "</a></div>");
});

var activityText="";
//for each event
_.each(events, function (currEvent) {
  var usernameLink = "<a href=\"http://github.com/" + currEvent.actor.login + "\">" + currEvent.actor.login +"<a/>";
  var repoLink =  "<a href=\"http://github.com/" + currEvent.repo.name + "\">"  + currEvent.repo.name+"<a/>";

  //check to see if it is a push event
  if(currEvent.type==="PushEvent"){
    var branchLink = "<a href=\"http://github.com/"
                      + currEvent.repo.name
                      + "/tree/"
                      + currEvent.payload.ref.split("/")[2]
                      + "\">"
                      + currEvent.payload.ref.split("/")[2]
                      + "<a/>";
    //if so, add the CSS with the push event info
    activityText = "<span class=\"mega-octicon octicon-git-commit\"></span><div class = \"time\">"
                    + moment(currEvent.created_at).fromNow()
                    + "</div><div class = \"title\">"
                    + usernameLink
                    + " pushed to "
                    + branchLink
                    + " at "
                    + repoLink
                    + "</div>"
                    + "<div class = \"details\">"
                    //+ big avatar
                    //+ little avatar
                    + "<a href = \"http://github.com/"
                    + currEvent.repo.name
                    + "/commit/"
                    + currEvent.payload.head
                    + "\">"
                    + currEvent.payload.head.substring(0,6)
                    + "</a> "
                    + currEvent.payload.commits[0].message;
    //if not a push event, then it is a create event, and check to see if it was a create repo event
  }else if (currEvent.payload.ref_type === "repository"){
    //if so, add the CSS with the create repo event info
    activityText = "<span class=\"octicon octicon-repo\"></span>"
                    + usernameLink
                    + " created repository "
                    + repoLink
                    + moment(currEvent.created_at).fromNow()
                    +"<br>";
  }else{
    var branchLink = "<a href=\"http://github.com/"
                      + currEvent.repo.name
                      + "/tree/"
                      + currEvent.payload.ref
                      + "\">"
                      + currEvent.payload.ref
                      +"<a/>";
    //if not, it is a create branch event. add the appropriate css and html
    activityText = "<span class=\"octicon octicon-git-branch\"></span>"
                    + usernameLink
                    + " created branch "
                    + branchLink
                    + " at "
                    + repoLink
                    + moment(currEvent.created_at).fromNow()
                    +"<br>";
  }
  //put the event info in the activity div
  $(".activity").append(activityText);
});

//when you click the repo tab, show the repo info and hide the contributions and activity info
$(".repoTab").click(function (event) {
  event.preventDefault();
  $(".repos").css("display","block");
  $(".repos").siblings().css("display","none");
});
//when you click the contributions tab, show the contributions info and hide the repo and activity info
$(".contrTab").click(function (event) {
  event.preventDefault();
  $(".contributions").css("display","block");
  $(".contributions").siblings().css("display","none");
});
//when you click the activity tab, show the activity info and hide the repo and contributions info
$(".activTab").click(function (event) {
  event.preventDefault();
  $(".activity").css("display","block");
  $(".activity").siblings().css("display","none");
});
