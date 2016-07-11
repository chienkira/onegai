/*global angular*/
'use strict';

angular
	.module('stack.service')
	.factory('userService', ['$q', '$http', '$stamplay', function ($q, $http, $stamplay) {
		var user = $stamplay.User().Model;

		return {
			isLogged: function () {
				return user.isLogged;
			},

			login: function () {
				user.login('github');
			},

			logout: function () {
				user.logout('github');
			},

			getUserModel: function () {
				var def = $q.defer();
				if (user.get('_id')) {
					def.resolve(user);
				} else {

					user.currentUser()
						.then(function () {
							$http({
								method: 'GET',
								url: '/api/gm/v0/challenges/stackchallenge/userchallenges/' + user.get('_id')
							}).success(function (response) {
								if (response.points) {
									user.totalPoints = response.points;
								} else {
									user.totalPoints = 0;
								}
							})

							def.resolve(user);
						})
						.catch(function (err) {
							def.reject(err);
						});
				}

				return def.promise;
			}
		};
	}])

.factory('usersService', ['$q', '$stamplay', function ($q, $stamplay) {
	var usersList = $stamplay.User().Collection;

	return {

		getUsers: function () {
			var def = $q.defer();

			usersList.fetch()
				.then(function () {
					def.resolve(usersList);
				})
				.catch(function (err) {
					def.reject(err);
				});

			return def.promise;
		},

		getById: function (userId) {
			var def = $q.defer();
			var fetched;

			if (usersList.get(userId)) {
				fetched = usersList.get(userId);
				def.resolve(fetched);
			} else {
				fetched = $stamplay.User().Model;
				fetched.fetch(userId)
					.then(function () {
						usersList.add(fetched);
						def.resolve(fetched);
					})
					.catch(function (err) {
						def.reject(err);
					});
			}

			return def.promise;
		},

		searchUser: function (params) {
			var fetched = $stamplay.User().Collection;
			var def = $q.defer();

			fetched.fetch(params)
				.then(function () {
					def.resolve(fetched);
				})
				.catch(function (err) {
					def.reject(err);
				});

			return def.promise;
		}

	};
}])