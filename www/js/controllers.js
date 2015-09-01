angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('SeasonCtrl', function($scope) {})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('HistoryCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('PlayersCtrl', function($scope, Players) {
  $scope.players = Players;
})

.controller('FixturesCtrl', function($scope, AllFixtures) {
  $scope.allFixtures = AllFixtures;
});

