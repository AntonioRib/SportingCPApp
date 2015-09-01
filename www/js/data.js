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



/*
Thats how to use.
jQuery(document).ready(function(){
	season = getLeagueSeason("PPL");
	team = getTeamBySeason("Sporting Lisbon", season);
	console.log(getPlayersByTeam(team));
	console.log(getFixturesByTeam(team));
	console.log(getLeagueTableBySeason(season));
})*/

