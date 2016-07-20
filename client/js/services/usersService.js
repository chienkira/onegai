/*global angular*/
'use strict';

angular
	.module('onegai.service')
	.factory('usersService', ['$q', 'Restangular', function ($q, Restangular) {

    //Use Restangular
    var factory = Restangular.all("users");

    return factory;
	}]);
