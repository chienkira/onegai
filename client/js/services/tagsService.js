/*global angular*/
'use strict';

angular
	.module('onegai.service')
	.factory('tagsService', ['$q', 'Restangular', function ($q, Restangular) {

    //Use Restangular
    var factory = Restangular.all("tags");

    return factory;
	}]);
