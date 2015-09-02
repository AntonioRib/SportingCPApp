//football-data wrapper.
jQuery.getScript("js/api.js");
//BL1 - Bundesliga 1
//FL1 - Ligue 1
//PL - Premier League
//PD - Primera Division
//SA - Serie A
//PPL - Primeira Liga
//DED - Eredivisie 
//CL - Champions League

//Sporting Lisbon - Sporting

//if season == null - actual season
function getLeagueSeason(league, season){
	var resource_url = 'http://api.football-data.org/alpha/soccerseasons';
	resource_url += season == null ? "" : "?season="+season;
	var answer;
	jQuery.ajax({
		headers: { 'X-Auth-Token': api_key },
		url: resource_url,
		dataType: 'json',
		type: 'GET',
		async: false,
		success: function(response) {
			for(var i=0; i<response.length; i++){
				var season = response[i];
				if(season.league === league){
					answer = season;
				}
			}
		} 
	});
	return answer;
}

function getTeamBySeason(teamName, season){
	var resource_url = season._links.teams.href;
	var answer;
	jQuery.ajax({
		headers: { 'X-Auth-Token': api_key },
		url: resource_url,
		dataType: 'json',
		type: 'GET',
		async: false,
		success: function(response) {
			var teams = response.teams;
			for(var i=0; i<teams.length; i++){
				var team = teams[i];
				if(team.name === teamName){
					answer = team;
				}
			}
		} 
	});
	return answer;
}

function getPlayersByTeam(team){
	var resource_url = team._links.players.href;
	var answer;
	jQuery.ajax({
		headers: { 'X-Auth-Token': api_key },
		url: resource_url,
		dataType: 'json',
		type: 'GET',
		async: false,
		success: function(response) {
			answer = response.players;
		} 
	});
	answer.sort(function(a, b){
		console.log(a.jerseyNumber);
		if(a.jerseyNumber == null){
			return 1;
		}

		if(b.jerseyNumber == null){
			return -1;
		}

		return a.jerseyNumber - b.jerseyNumber;
	})
	return answer;
}

function getAllFixturesByTeam(team){
	var resource_url = team._links.fixtures.href;
	var answer;
	jQuery.ajax({
		headers: { 'X-Auth-Token': api_key },
		url: resource_url,
		dataType: 'json',
		type: 'GET',
		async: false,
		success: function(response) {
			answer = response.fixtures;
		} 
	});
	return answer;
}

function getLeagueTableBySeason(season){
	var resource_url = season._links.leagueTable.href;
	var answer;
	jQuery.ajax({
		headers: { 'X-Auth-Token': api_key },
		url: resource_url,
		dataType: 'json',
		type: 'GET',
		async: false,
		success: function(response) {
			answer = response.players;
		} 
	});
	return answer;
}

function getSeasonByFixture(fixture) {
	var resource_url = fixture._links.soccerseason.href;
	var answer;
	jQuery.ajax({
		headers: { 'X-Auth-Token': api_key },
		url: resource_url,
		dataType: 'json',
		type: 'GET',
		async: false,
		success: function(response) {
			answer = response.league;
		} 
	});
	return answer;
};

function getNews(){
	var resource_url = "https://webhose.io/search?token=8c1a7422-f92c-492c-aae9-87790c49297a&format=json&q=Sporting%20Clube%20de%20Portugal%20(Portugal)&language=portuguese";
	var answer;
	jQuery.ajax({
		url: resource_url,
		dataType: 'json',
		type: 'GET',
		async: false,
		success: function(response) {
			answer = response.posts;
		} 
	});
	answer.sort(function(a, b){
		aDate = new Date(a.thread.published);
		bDate = new Date(b.thread.published);
		return bDate - aDate;
	})
	return answer;
}
/*
Thats how to use.
jQuery(document).ready(function(){
	season = getLeagueSeason("PPL");
	team = getTeamBySeason("Sporting Lisbon", season);
	console.log(getPlayersByTeam(team));
	console.log(getFixturesByTeam(team));
	console.log(getLeagueTableBySeason(season));
})*/

