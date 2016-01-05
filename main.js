var githubPage = {
  init: function () {
    githubPage.styling();
    githubPage.events();
  },

  styling: function(){
    //Fill header info
    $("title").text(profile.login + " (" + profile.name + ")");
    $(".small-avatar").html("<img src = " + profile.avatar_url + "/>");

    //Left sidebar
    $(".profile").prepend("<img src = " + profile.avatar_url + "/>");
    $(".username").text(profile.login);
    $(".name").text(profile.name);
    $(".company").html("<span class=\"octicon octicon-organization\"></span>"+profile.company);
    $(".location").html("<span class=\"octicon octicon-location\"></span>"+profile.location);
    $(".email").html("<span class=\"octicon octicon-mail\"></span><a href = \"mailto:"+ profile.email+ "\">" + profile.email + "</a>");
    $(".blog").html("<span class=\"octicon octicon-link\"></span><a href = \""+ profile.blog+ "\">" + profile.blog + "</a>");
    $(".joinDate").html("<span class=\"octicon octicon-clock\"></span>"+"Joined on "+moment(profile.created_at).format("MMM DD, YYYY"));

    //profile stats:
    //followers url
    var followers_html="<a class = \"statLink\" href = " + profile.html_url + "/followers ><span class=\"stat\">"+profile.followers +"</span>Followers</a>";
    var starred_html="<a class = \"statLink\" href = https://github.com/stars/" + profile.login + "><span class=\"stat\">" + starred.length + "</span>Stars</a>";
    var following_html="<a class = \"statLink\" href = " + profile.html_url + "/following ><span class=\"stat\">" + profile.following + "</span>Following</a>";
    $(".stats").html(followers_html+starred_html+following_html);

    //profile orgs:
    _.each(orgs, function(org){
      githubPage.loadTemplate("#orgTmpl",org,".orgs");
    });

    //sort repos by date so the newest is first
    sortedRepos = _.sortBy(repos,function(repo){
      var dt = new Date(repo.updated_at);
      return -dt;
    });

    //add all the repos
    var repoFilter = "all";
    _.each(sortedRepos, function (repo) {
      githubPage.loadTemplate("#repoTmpl",repo,"#repos");
    });

    //for each event
    _.each(events, function (currEvent) {
      //check to see if it is a push event
      if(currEvent.type==="PushEvent"){
        githubPage.loadTemplate("#pushEventTmpl",currEvent,"#activity");
      //if not a push event, then it is a create event, and check to see if it was a create repo event
      }else if (currEvent.payload.ref_type === "repository"){
        githubPage.loadTemplate("#createRepoEventTmpl",currEvent,"#activity");
      }else{
        //if not, it is a create branch event
        githubPage.loadTemplate("#createBranchEventTmpl",currEvent,"#activity");
      }
    });

  },
  events:function () {
    //when you click a section tab, show that section and hide the others
    $(".nav-tabs a").click(function (event) {
        event.preventDefault()
        $(this).tab('show')
      });
  },
  loadTemplate: function (template, obj,element) {
    var compiledTemplate = _.template($(template).html());
    $(element).append(compiledTemplate(obj));
  }
}

$(document).ready(function(){
  githubPage.init();
})
