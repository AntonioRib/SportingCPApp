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

//if season == null - actual season
function getLeagueSeasonId(league, season){
	var resource_url = 'http://api.football-data.org/alpha/soccerseasons';
	resource_url += season == null ? "" : "?season="+season;

	jQuery.ajax({
		headers: { 'X-Auth-Token': api_key },
		url: resource_url,
		dataType: 'json',
		type: 'GET',
		success: function(response) {
			for(var i=0; i<response.length; i++){
				var season = response[i];
				if(season.league === league){
					console.log(season._links.self.href);
				}
			}
		} 
	});
}

jQuery(document).ready(function(){
	getLeagueSeasonId("PPL", 2014);
})