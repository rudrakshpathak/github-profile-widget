$(document).ready(function () {
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://cdn.rawgit.com/rudrakshpathak/github-profile-widget/master/css/github-widget.css';
    head.appendChild(link);

    var username = $("#github-widget").attr('data-github-username');
    var widgetType = $("#github-widget").attr('data-widget-type');
    var widgetColor = $("#github-widget").attr('data-widget-color');
    var fetchUser = "https://api.github.com/users/" + username;

    if(widgetColor == undefined){
        widgetColor = '#333';
    }

    if (widgetType == "large" || widgetType == undefined) {
        createLargeWidget(fetchUser, username, widgetColor);
    }
    else if(widgetType == "small"){
        createSmallWidget(fetchUser, username, widgetColor);
    }
    else {
        widgetError();
    }

});

function createLargeWidget(fetchUser, username, widgetColor) {
    $.get(fetchUser, function (result) {
        var htmlView = `<div class="github-widget">`;
        htmlView += `<section class="widget-header">`;
        htmlView += `<img src="https://cdn.rawgit.com/rudrakshpathak/github-profile-widget/master/img/github-logo.png" class="github-logo">`;
        htmlView += `<div class="details">`;
        htmlView += `<p><a id="username" href="` + result.html_url + `">` + result.name + `</a></p>`;
        htmlView += `<p id="location">` + result.location + `</p>`;
        htmlView += `<p id="blog"><a href="` + result.blog + `">` + result.blog + `</a></p>`;
        htmlView += `<div class="row counts">`;
        htmlView += `<div class="col-sm-4">`;
        htmlView += `<a href="` + result.repos_url + `">Repos:</a>` + result.public_repos;
        htmlView += `</div>`;
        htmlView += `<div class="col-sm-4">`;
        htmlView += `<a href="` + result.following + `">Followers:</a>` + result.following;
        htmlView += `</div>`;
        htmlView += `<div class="col-sm-4">`;
        htmlView += `<a href="` + result.following + `">Following:</a>` + result.following;
        htmlView += `</div>`;
        htmlView += `</div>`;
        htmlView += `<div class="github-user-image"><img src="` + result.avatar_url + `" id="user-image" alt="user image"></div>`;
        htmlView += `</section>`;
        htmlView += `<section class="information">`;
        htmlView += `<div class="row">`;
        htmlView += `<div class="col-sm-12">`;
        htmlView += `<p id="bio">` + result.bio + `</p>`;
        htmlView += `</div>`;
        htmlView += `</div>`;
        htmlView += `</section>`;

        var fetchRepos = "https://api.github.com/users/" + username + "/repos?per_page=100";
        htmlView += `<section class="repos-section">`;
        $.get(fetchRepos, function (result) {
            for (var key in result) {
                var obj = result[key];
                htmlView += `<div class="repo">`;
                htmlView += `<h4><a href="` + obj.html_url + `">` + obj.name + `</a></h4>`;
                htmlView += `<div class="row">`;
                htmlView += `<div class="col-sm-3">`;
                htmlView += `<span><a href="` + obj.forks_url + `">Forks</a>:` + obj.forks_count + `</span>`;
                htmlView += `</div>`;
                htmlView += `<div class="col-sm-3">`;
                htmlView += `<span><a href="` + obj.issues_url + `">Issues</a>:` + obj.open_issues_count + `</span>`;
                htmlView += `</div>`;
                htmlView += `<div class="col-sm-6">`;
                htmlView += `<span>` + obj.language + `</span>`;
                htmlView += `</div>`;
                htmlView += `</div>`;
                htmlView += `</div>`;

            }
            htmlView += `</section>`;
            htmlView += `</div>`;
            $("#github-widget").html(htmlView);
            $(".widget-header").css("background-color", widgetColor);
        });
    });
}

function createSmallWidget(fetchUser, username, widgetColor) {
    $.get(fetchUser, function (result) {
        var htmlView = `<div class="small-github-widget">`;
        htmlView += `<section class="widget-header">`;
        htmlView += `<img src="https://cdn.rawgit.com/rudrakshpathak/github-profile-widget/master/img/github-logo.png" class="github-logo">`;
        htmlView += `<div class="details">`;
        htmlView += `<p><a id="username" href="` + result.html_url + `">` + result.name + `</a></p>`;
        htmlView += `<p id="location">` + result.location + `</p>`;
        htmlView += `<p id="blog"><a href="` + result.blog + `">` + result.blog + `</a></p>`;
        htmlView += `<div class="row counts">`;
        htmlView += `<div class="col-sm-4">`;
        htmlView += `<a href="` + result.repos_url + `">Repos:</a>` + result.public_repos;
        htmlView += `</div>`;
        htmlView += `<div class="col-sm-4">`;
        htmlView += `<a href="` + result.following + `">Followers:</a>` + result.following;
        htmlView += `</div>`;
        htmlView += `<div class="col-sm-4">`;
        htmlView += `<a href="` + result.following + `">Following:</a>` + result.following;
        htmlView += `</div>`;
        htmlView += `</div>`;
        htmlView += `</section>`;
        htmlView += `</div>`;
        $("#github-widget").html(htmlView);
        $(".widget-header").css("background-color", widgetColor);
    });
}

function widgetError() {
    var htmlView = `<div class="github-widget">`;
    htmlView += `<p>Unable to load widget.</p>`;
    htmlView += `</div>`;
    $("#github-widget").html(htmlView);
}
