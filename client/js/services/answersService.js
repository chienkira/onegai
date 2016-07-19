/*global angular*/
'use strict';

angular
	.module('onegai.service')
	.factory('answersService', ['$q', 'Restangular', function ($q, Restangular) {

    //Use Restangular
    var factory = Restangular.all("posts");

    return factory;
	}]);
