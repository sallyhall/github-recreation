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

repos = _.sortBy(repos,function(repo){
  var dt = new Date(repo.updated_at);
  return -dt;
});

_.each(repos, function (repo) {
  $("main").append("<p>"+repo.name + "updated " + moment(repo.updated_at).fromNow()+"</p>");
  $("main").append("<p>"+repo.language + " watchers: " +repo.stargazers_count + " forks: " +repo.forks_count+"</p>");
});
