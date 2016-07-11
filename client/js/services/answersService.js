/*global angular*/
'use strict';

angular
	.module('stack.service')
	.factory('answersService', ['$q', 'usersService', '$stamplay', function ($q, usersService, $stamplay) {

		function _getTotalVotes(model) {
			return model.get('actions').votes.users_upvote.length - model.get('actions').votes.users_downvote.length
		}

		return {

			createAnswer: function (params) {
				var def = $q.defer();
				var answerModel = $stamplay.Cobject('answer').Model;

				angular.forEach(params, function (value, key) {
					answerModel.set(key, value);
				});

				answerModel.save()
					.then(function () {
						return usersService.getById(answerModel.get('author'))
					})
					.then(function (authorModel) {
						answerModel.set('author', authorModel);
						def.resolve(answerModel);
					})
					.catch(function (err) {
						def.reject(err);
					});

				return def.promise;
			},

			updateModel: function (answer, attrs) {
				var answerModel = $stamplay.Cobject('answer').Model;
				attrs.forEach(function (key) {
					answerModel.set(key, answer.get(key));
				});
				answerModel.set('_id', answer.get('_id'));

				return answerModel.save({
					patch: true
				});

			},

			voteUp: function (aModel) {
				var def = $q.defer();
				//cache populate data
				var author = aModel.get('author');

				aModel.upVote()
					.then(function () {
						aModel.set('author', author);

						def.resolve(_getTotalVotes(aModel));
					})
					.catch(function (err) {
						def.reject(err);
					})

				return def.promise;
			},

			voteDown: function (aModel) {
				var def = $q.defer();
				//cache populate data
				var author = aModel.get('author');

				aModel.downVote()
					.then(function () {
						aModel.set('author', author);

						def.resolve(_getTotalVotes(aModel));
					})
					.catch(function (err) {
						def.reject(err);
					})

				return def.promise;
			},

			comment: function (aModel, commentText) {
				var def = $q.defer();
				//cache populate data
				var author = aModel.get('author');

				aModel.comment(commentText)
					.then(function () {
						aModel.set('author', author);
						def.resolve();
					})
					.catch(function (err) {
						def.reject(err);
					})

				return def.promise;
			},

			getById: function (answerId) {
				var def = $q.defer();
				var answerModel = $stamplay.Cobject('answer').Model;

				answerModel.fetch(answerId)
					.then(function () {
						return usersService.getById(answerModel.get('author'));
					})
					.then(function (authorModel) {
						answerModel.set('author', authorModel);
						def.resolve(answerModel);
					})
					.catch(function (err) {
						def.reject(err);
					});

				return def.promise;
			}
		};
	}]);