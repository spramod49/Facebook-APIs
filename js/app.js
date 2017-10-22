//Basic user information api call
$("#feed").hide();
$("#profile").hide();
$("img[src='loader.gif']").hide();
$("#profileButton").click(()=>{
	$("#feed").hide();
	$("#profile").hide();
	$("img[src='loader.gif']").show();

	var token = document.getElementById("token").value;
    $.ajax({
    	url: "https://graph.facebook.com/10205173372031339?fields=name,email,cover,favorite_athletes,favorite_teams,first_name,education,hometown,work,posts,friends&access_token="+token,
        type: 'GET',
        success: function(res)
        {

			console.log(res);
			console.log(res.email);
			$("img[src='loader.gif']").hide();
			$("#profile").show(500);
			loadCover(res.cover.source);
			loadName(res.name, res.email, res.hometown);
			favoriteAthletes(res.favorite_athletes);
			favoriteTeams(res.favorite_teams);
			workCard(res.work[0]);
			educationCard(res.education);
        },
        error: function(res){
			var message = JSON.parse(res.responseText);
        	console.log(message.error.message);
			$("img[src='loader.gif']").hide();
			$("#profile").show();
        }
    });
});
$("#feedsButton").click(()=>{
	$("#profile").hide();
	$("img[src='loader.gif']").show();
	var token = document.getElementById("token").value;
    $.ajax({
    	url: "https://graph.facebook.com/10205173372031339?fields=feed&access_token="+token,
        type: 'GET',
        success: function(res)
        {
            $("#feed").show(500);
			$("img[src='loader.gif']").hide();
			console.log(res);
        },
        error: function(res){
			var message = JSON.parse(res.responseText);
        	console.log(message.error.message);
			$("img[src='loader.gif']").hide();
        }
    });
});

function loadCover(imageLink){
	$("img[alt*='cover']").attr("src",imageLink);
}
function loadName(name,email,hometown){
	$("div[name='name'] ul").append("<li>Name: "+name+" </li><li>Email: "+email+"</li><li>Hometown: "+hometown.name+"</li>");
}

function favoriteAthletes(athletes){
	athletes.forEach((athlete,i)=>{
		$("div[name*='athletes']>div>div>ul" ).append( "<li>"+athlete.name+"</li>");
	});
}
function favoriteTeams(teams){
	teams.forEach((team,i)=>{
		$("div[name*='teams']>div>div>ul" ).append( "<li>"+team.name+"</li>");
	})
}

function workCard(work){
	$("div[name*=work]>div>div>ul").append(`<li>Employer: </li>`+work.employer.name+
										`<li>Location: </li>`+work.location.name+
										`<li>Position: </li>`+work.position.name);//"<p>I work for "+work.employer.name+" at "+work.location.name+" as a "+work.position.name+"</p>")
}

function educationCard(education) {

	education.forEach((e,i)=>{
		$("div[name*=education]>div>div>ul").append("<li>"+e.school.name+"</li>");
		if (e.concentration) {
			e.concentration.forEach((mainSubjects)=>{
			$("div[name*=education]>div>div[1]").html("<p> Main subject(s): "+mainSubjects.name+"</p>");
			})
		}
	})
}


// Profile info API --->https://graph.facebook.com/10205173372031339?fields=email,cover,favorite_athletes,favorite_teams,first_name,education,gender,hometown,work,posts,friends&access_token
//Feed API --- https://graph.facebook.com/10205173372031339?fields=feed&access_token= >
// favorite teams work and education
