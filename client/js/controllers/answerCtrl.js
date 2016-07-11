/*global angular*/
'use strict';
/*
 * This controller is responsible to enable/disable UI controls
 * in the view that shows details and answers of a question.
 * It checks if the user looking at it is the author (so that he
 * can eventually check answers as correct) or if the user
 * previously voted for it.
 * The main functions defined here are: `setChecked`, `comment`, `voteUp` and `voteDown`
 */
angular
	.module('stack')
	.controller('answerCtrl', ['$scope', 'question', 'userService', 'questionsService', 'answersService',
		function ($scope, question, userService, questionsService, answersService) {
			var answerModel = this;
			if (userService.isLogged()) {
				/* Only logged users can update instances */
				questionsService.updateViews(question);
			}

			userService.getUserModel().then(function (response) {
				answerModel.user = response;
			});

			answerModel.question = question;
			answerModel.question.set('showCommentArea', false);

			answerModel.qTotalVote = question.instance.actions.votes.users_upvote.length - question.instance.actions.votes.users_downvote.length;
			for (var i = 0, j = answerModel.question.get('answers').length; i < j; i++) {
				answerModel.question.get('answers')[i].set('showCommentArea', false);
			}

			/* Redirects to login */
			answerModel.toLogin = function () {
				document.location.href = '/auth/v0/github/connect';
			};

			/* Returns true if the logged user has voted down */
			answerModel.checkVoteDown = function (users) {
				var found = [];
				if (!answerModel.user) {
					return false;
				}
				if (users.length) {
					found = users.filter(function (userId) {
						return userId === answerModel.user.get('_id');
					});
				}

				return found.length > 0;
			};

			/* Returns true if the logged user is the author of the question */
			answerModel.canCheckAnswer = function () {
				if (!answerModel.user) {
					return false;
				}

				var canCheck = true;
				if (question.get('author').get('id') === answerModel.user.get('id')) {
					for (var i = 0, j = question.get('answers').length; i < j && canCheck; i++) {
						var answer = question.get('answers')[i];
						if (answer.get('checked')) {
							canCheck = false;
						}
					}
				} else {
					canCheck = false;
				}
				return canCheck;
			};

			/* Shows/Hide the comment area */
			answerModel.toggleCommentArea = function (model, $index) {
				if (!userService.isLogged()) {
					return;
				}

				if (model.get('cobjectId') === 'answer') {
					var oldValue = answerModel.question.get('answers')[$index].get('showCommentArea') || false;
					answerModel.question.get('answers')[$index].set('showCommentArea', !oldValue);
					for (var i = 0, j = answerModel.question.get('answers').length; i < j; i++) {
						if (i !== $index) {
							answerModel.question.get('answers')[i].set('showCommentArea', false);
						}
					}
				} else {
					answerModel.question.set('showCommentArea', !answerModel.question.get('showCommentArea'));
				}
			};

			/* Set to true the checked attribute of the answer */
			answerModel.setChecked = function (question, answer) {
				answer.set('checked', true);
				question.set('checked', true);

				answersService.updateModel(answer, ['checked'])
					.then(function () {
						return questionsService.updateModel(question, ['checked']);
					})
					.catch(function () {
						console.error('Error during check answer');
						answer.set('checked', false);
						question.set('checked', false);
					});
			};

			/* Comment an answer or a question */
			answerModel.commentQuestion = function (qModel, questionCommentText) {
				if (!userService.isLogged()) {
					return;
				}

				questionsService.commentQuestion(qModel, questionCommentText)
					.then(function () {
						answerModel.questionCommentText = '';
					})
					.catch(function (err) {
						console.log('Not authorized');
						console.log(err);
					});
			};

			answerModel.commentAnswer = function (aModel, answerText) {
				answersService.comment(aModel, answerText)
					.then(function () {
						answerModel.commentAnswerText = '';
					})
					.catch(function (err) {
						console.log('Not authorized');
						console.log(err);
					});
			};

			/* Vote up the coinstance */
			answerModel.voteUp = function (qModel, aModel) {
				if (!userService.isLogged()) {
					return;
				}

				if (!aModel) {
					questionsService.voteUp(qModel)
						.then(function (totalVote) {
							answerModel.qTotalVote = totalVote || 0;
						})
						.catch(function () {
							console.log('Not authorized');
						});
				} else {
					answersService.voteUp(aModel)
						.then(function (totalVote) {
							aModel.totalVote = totalVote;
						})
						.catch(function () {
							console.log('Not authorized');
						});
				}
			};

			/* Vote down the coinstance */
			answerModel.voteDown = function (qModel, aModel) {
				if (!userService.isLogged()) {
					return;
				}

				if (!aModel) {
					questionsService.voteDown(qModel)
						.then(function (totalVote) {
							answerModel.qTotalVote = totalVote || 0;
						})
						.catch(function () {
							console.log('Not authorized');
						});
				} else {
					answersService.voteDown(aModel)
						.then(function (totalVote) {
							aModel.totalVote = totalVote;
						})
						.catch(function () {
							console.log('Not authorized');
						});
				}

			};
		}
	]);