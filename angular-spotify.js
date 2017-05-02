(function (window, angular, undefined) {
  'use strict';

  angular
    .module('spotify', [])
    .provider('Spotify', function () {

      // Module global settings.
      var settings = {};
      settings.clientId = null;
      settings.redirectUri = null;
      settings.scope = null;
      settings.authToken = null;

      this.setClientId = function (clientId) {
        settings.clientId = clientId;
        return settings.clientId;
      };

      this.getClientId = function () {
        return settings.clientId;
      };

      this.setAuthToken = function (authToken) {
        settings.authToken = authToken;
        return settings.authToken;
      };

      this.setRedirectUri = function (redirectUri) {
        settings.redirectUri = redirectUri;
        return settings.redirectUri;
      };

      this.getRedirectUri = function () {
        return settings.redirectUri;
      };

      this.setScope = function (scope) {
        settings.scope = scope;
        return settings.scope;
      };

      var utils = {};
      utils.toQueryString = function (obj) {
        var parts = [];
        angular.forEach(obj, function (value, key) {
          this.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }, parts);
        return parts.join('&');
      };

      /**
       * API Base URL
       */
      settings.apiBase = 'https://api.spotify.com/v1';

      this.$get = ['$q', '$http', '$window', function ($q, $http, $window) {

        function NgSpotify () {
          this.clientId = settings.clientId;
          this.redirectUri = settings.redirectUri;
          this.apiBase = settings.apiBase;
          this.scope = settings.scope;
          this.authToken = settings.authToken;
          this.toQueryString = utils.toQueryString;
        }

        

        NgSpotify.prototype = {
          api: function (endpoint, method, params, data, headers) {
            var deferred = $q.defer();

            $http({
              url: this.apiBase + endpoint,
              method: method ? method : 'GET',
              params: params,
              data: data,
              headers: headers,
              withCredentials: false
            })
            .then(function (data) {
              deferred.resolve(data);
            })
            .catch(function (data) {
              deferred.reject(data);
            });
            return deferred.promise;
          },

          _auth: function (isJson) {
            var auth = {
              'Authorization': 'Bearer ' + this.authToken
            };
            if (isJson) {
              auth['Content-Type'] = 'application/json';
            }
            return auth;
          },
          /**
           * Search Spotify
           * q = search query
           * type = artist, album or track
           */
          search: function (q, type, options) {
            options = options || {};
            options.q = q;
            options.type = type;

            return this.api('/search', 'GET', options);
          },
        };

        return new NgSpotify();
      }];

    });

}(window, angular));
