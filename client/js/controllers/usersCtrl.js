/*global angular*/
'use strict';
angular
	.module('onegai')
	.controller('usersCtrl', ['users', 'usersService',
		function (users, usersService) {
			var usersModel = this;
			usersModel.sortOnNewUsers = true;
			usersModel.searchUser = '';
			usersModel.userList = users;

			usersModel.search = function () {
				var reg = '".*' + usersModel.searchUser + '.*"';
				var query = {
					'where': '{"displayName": {"$regex" : ' + reg + ', "$options": "i"}}'
				};

				usersService.searchUser(query).then(function (response) {
					usersModel.userList = response;
				});
			};
		}
	]);