//Basic user information api call
$("#feed").hide();
$("#profile").hide();
$("img[src='loader.gif']").hide();


$("#profileButton").click(() => {
    $("#feed").hide();
    $("#profile").hide();
    $("img[src='loader.gif']").show();

    var token = document.getElementById("token").value;
    if ($("div[name='name']>div>div.panel-body>ul")[0].children.length === 0) {
        $.ajax({
            url: "https://graph.facebook.com/me?fields=name,email,cover,favorite_athletes,favorite_teams,first_name,education,hometown,work,posts&access_token=" + token,
            type: 'GET',
            success: function(res) {

                // console.log(res);
                // console.log(res.email);
                $("img[src='loader.gif']").hide();
                loadCover(res.cover.source);
                loadName(res.name, res.email, res.hometown);
                favoriteAthletes(res.favorite_athletes);
                favoriteTeams(res.favorite_teams);
                workCard(res.work[0]);
                educationCard(res.education);
                $("#profile").show(500);
            },
            error: function(res) {

                var message = JSON.parse(res.responseText);
                alertify.alert("Oops!",message.error.message);
                $("img[src='loader.gif']").hide();
            }
        });
    } else {
        $("img[src='loader.gif']").hide();
        $("#profile").show(500);
    }

});

function loadCover(imageLink) {
    $("img[alt*='cover']").attr("src", imageLink);
    $("header>div").attr("style", "background-image: url('" + imageLink + "')");
    // background-image: url('images/img.jpg')
}

function loadName(name, email, hometown) {
    $("div[name='name'] ul").append("<li><strong>Name:</strong> " + name + " </li><li><strong>Email: </strong>" + email + "</li><li><strong>Hometown: </strong>" + hometown.name + "</li>");
}

function favoriteAthletes(athletes) {
    athletes.forEach((athlete, i) => {
        if (i < 16) {
            $("div[name*='athletes']>div>div>ul").append("<li>" + athlete.name + "</li>");
        }

    });
}

function favoriteTeams(teams) {
    teams.forEach((team, i) => {
        $("div[name*='teams']>div>div>ul").append("<li>" + team.name + "</li>");
    })
}

function workCard(work) {
    $("div[name*=work]>div>div>ul").append(`<li><strong>Employer: </strong>` + work.employer.name + `</li>
											<li><strong>Location: </strong>` + work.location.name + `</li>
											<li><strong>Position: </strong>` + work.position.name + `</li>`); //"<p>I work for "+work.employer.name+" at "+work.location.name+" as a "+work.position.name+"</p>")
}

function educationCard(education) {

    education.forEach((e, i) => {
        $("div[name*=education]>div>div>ul").append("<li>" + e.school.name + "</li>");
        if (e.concentration) {
            e.concentration.forEach((mainSubjects) => {
                // $("div[name*=education]>div>div>ul").append("<li> Main subject(s): "+mainSubjects.name+"</p>");
            })
        }
    })
}

$('#feedsButton').on('click', () => {
    $("#profile").hide();
    // $("#feed").show(500);
    $("img[src='loader.gif']").show();
    var token = document.getElementById("token").value;
    if ($("#feed>.row")[0].children.length === 0) {
        $.ajax({
            url: "https://graph.facebook.com/me/feed?limit=12&access_token=" + token,
            type: 'GET',
            success: function(res) {
                $("img[src='loader.gif']").hide();
                populateFeed(res.data, res.paging);
                $("#feed").show(500);
                // console.log(res);
            },
            error: function(res) {
                var message = JSON.parse(res.responseText);
                // console.log(message.error.message);
                alertify.alert(message.error.message);
                $("img[src='loader.gif']").hide();
                // $("#feed").show(500);
            }
        });
    } else {
        $("img[src='loader.gif']").hide();
        $("#feed").show(500);
    }
});

function populateFeed(feeds, paging) {
    feeds.forEach((feed) => {
        if (feed.story) {
            $("#feed>.row").append(`<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
					<div class="panel feed">
						` + feed.story + `
					</div>
				</div>`);
        } else if (feed.message) {
            $("#feed>.row").append(`<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
					<div class="panel feed">
						` + feed.message + `
					</div>
				</div>`);
        }
    });
    // console.log(feeds);
    // $("#previous").attr("href", paging.previous);
    // $("#next").attr("href", paging.next);
}
// $("#feedsButton").click(() => {
//
// });


// $("#previous").click((e) => {
//     e.preventDefault();
// 	$("#feed").hide();
// 	$("img[src='loader.gif']").show();
// 	var previous_url = $(this).attr("href");
//     $.ajax({
//         url: previous_url,
// 		type: 'GET',
// 		success: (res)=>{
//             alert("in ajax");
// 			$("#feed>row").empty();
// 			populateFeed(res.data);
// 		}
//     });
// });

// $("#next").on("click",(e)=>{
//     e.preventDefault();
//     $("#feed>row>div[class*='col-lg-3']").remove();
//     $("#feed").hide();
// 	$("img[src='loader.gif']").show();
// 	var next_url = $("#next").attr("href");
//     alert(next_url);
//     $.ajax({
//         url: next_url,
// 		type: 'GET',
// 		success: (res)=>{
//             alert("ajax request made");
// 			$("#feed").empty();
//             console.log(res);
// 			populateFeed(res.data,res.paging);
// 			$("img[src='loader.gif']").hide();
// 			$("#feed").show();
// 		},
//         error: (res)=>{
//             console.log("error");
//             $("img[src='loader.gif']").hide();
//         }
//     });
// });

// $("#next").click(()=>{
// 	alert("Next clicked");
// 	$("#feed").hide();
// 	$("img[src='loader.gif']").show();
// 	var previous_url = $(this).attr("href");
//     $.ajax({
//         url: previous_url,
// 		type: 'GET',
// 		success: (res)=>{
// 			$("#feed>row").empty();
// 			populateFeed(res.data,res.paging);
// 			$("img[src='loader.gif']").hide();
// 			$("#feed").show();
// 		}
//     });
// });


// Profile info API --->https://graph.facebook.com/10205173372031339?fields=email,cover,favorite_athletes,favorite_teams,first_name,education,gender,hometown,work,posts,friends&access_token
//Feed API --- https://graph.facebook.com/10205173372031339?fields=feed&access_token= >
// favorite teams work and education
