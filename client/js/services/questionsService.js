/*global angular, async*/
'use strict';

angular
  .module('onegai.service')
  .factory('questionsService', ['$q',  'Restangular',
    function ($q, Restangular) {

      //Use Restangular
      var factory = Restangular.all("posts");

      return factory;
    }]);
