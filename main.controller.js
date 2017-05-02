
angular
  .module('exampleApp', ['spotify'])
  .config(function (SpotifyProvider) {
    SpotifyProvider.setClientId('123456789123456789');
    SpotifyProvider.setRedirectUri('http://example.com/callback.html');
    SpotifyProvider.setScope('playlist-read-private');
  })
  .controller('MainController', ['$scope', 'Spotify', function ($scope, Spotify,$http) {

    $scope.searchArtist = function () {
      Spotify.search($scope.searchartist, 'artist').then(function (response) {
        $scope.artists = response.data.artists.items;
      });
    };

    $scope.searchAlbum = function () {
        Spotify.search($scope.searchartist, 'album').then(function (response) {
          $scope.albums = response.data.albums.items;
        });
      };
  }]);
