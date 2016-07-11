/*global angular, async*/
'use strict';

angular
	.module('stack.service')
	.factory('questionsService', ['$q', 'usersService', 'tagsService', 'answersService', '$stamplay',
		function ($q, usersService, tagsService, answersService, $stamplay) {
			var questionsLoaded = $stamplay.Cobject('question').Collection;

			function _getTotalVotes(model) {
				return model.get('actions').votes.users_upvote.length - model.get('actions').votes.users_downvote.length
			}

			return {

				getQuestions: function (param) {
					var def = $q.defer();
					var questionsList = $stamplay.Cobject('question').Collection;

					questionsList.fetch(param, true)
						.then(function () {
							questionsList.instance.forEach(function (question) {
								question.set('author', question.get('owner'));
								def.resolve(questionsList);
							});
						});
					return def.promise;
				},

				searchQuestion: function (questionId) {
					var def = $q.defer();

					if (questionsLoaded.get(questionId)) {
						def.resolve(questionsLoaded.get(questionId));
					} else {
						var qModel = $stamplay.Cobject('question').Model;
						qModel.fetch(questionId)
							.then(function () {
								return usersService.getById(qModel.get('author'))
							})
							.then(function (authorModel) {
								qModel.set('author', authorModel);
							})
							.then(function () {
								if (qModel.get('tags').length) {
									return tagsService.getById(qModel.get('tags')[0])
								} else {
									return;
								}
							}).then(function (tagModel) {
								if (tagModel) {
									qModel.set('tags', [tagModel]);
								}
								def.resolve(qModel);
							})
							.catch(function (err) {
								def.reject(err);
							})
					}

					return def.promise;

				},

				/*
				 * Retrieve question and populate answer models
				 */
				getById: function (questionId) {
					var def = $q.defer();

					this.searchQuestion(questionId)
						.then(function (qModel) {

							var answerList = [];
							async.each(qModel.get('answers'),
								function (answer, callbackEach) {
									if (typeof answer === 'string') {
										//answer not previously solved
										answersService.getById(answer)
											.then(function (answerModel) {
												answerList.push(answerModel);
												callbackEach();
											})
											.catch(function (err) {
												callbackEach(err);
											});
									} else {
										//answer previously solved
										answerList.push(answer);
										callbackEach();
									}
								},
								function (err) {
									if (err) {
										def.reject(err);
									} else {
										qModel.set('answers', answerList);
										def.resolve(qModel);
									}

								});
						});

					return def.promise;
				},

				newQuestion: function (params) {
					var questionModel = $stamplay.Cobject('question').Model;
					angular.forEach(params, function (value, key) {
						questionModel.set(key, value);
					});

					return questionModel;
				},

				updateViews: function (question) {
					var questionModel = $stamplay.Cobject('question').Model;
					var actualViews = question.get('views') || 0;
					actualViews++;
					questionModel.set('_id', question.get('_id'));
					questionModel.set('views', actualViews);
					questionModel.set('owner', question.get('owner'));

					question.set('views', actualViews);

					return questionModel.save({
						patch: true
					});
				},

				updateModel: function (question, attrs) {
					var questionModel = $stamplay.Cobject('question').Model;
					attrs.forEach(function (key) {
						if (key !== 'answers') {
							questionModel.set(key, question.get(key));
						} else {
							var answerIDs = [];
							question.get('answers').forEach(function (item) {
								answerIDs.push(item.get('_id'));
							});

							questionModel.set('answers', answerIDs);
						}
					});

					questionModel.set('_id', question.get('_id'));

					return questionModel.save({
						patch: true
					});
				},

				voteUp: function (qModel) {
					var def = $q.defer();
					//cache populate data
					var author = qModel.get('author');
					var answers = qModel.get('answers');
					var tags = qModel.get('tags');

					qModel.upVote()
						.then(function () {
							qModel.set('author', author);
							qModel.set('answers', answers);
							qModel.set('tags', tags);

							def.resolve(_getTotalVotes(qModel));
						})
						.catch(function (err) {
							def.reject(err);
						})

					return def.promise;
				},

				voteDown: function (qModel) {
					var def = $q.defer();
					//cache populate data
					var author = qModel.get('author');
					var answers = qModel.get('answers');
					var tags = qModel.get('tags');

					qModel.downVote()
						.then(function () {
							qModel.set('author', author);
							qModel.set('answers', answers);
							qModel.set('tags', tags);

							def.resolve(_getTotalVotes(qModel));
						})
						.catch(function (err) {
							def.reject(err);
						})

					return def.promise;
				},

				commentQuestion: function (qModel, commentText) {
					var def = $q.defer();
					//cache populate data
					var author = qModel.get('author');
					var answers = qModel.get('answers');
					var tags = qModel.get('tags');

					qModel.comment(commentText)
						.then(function () {
							qModel.set('author', author);
							qModel.set('answers', answers);
							qModel.set('tags', tags);

							def.resolve();
						})
						.catch(function (err) {
							def.reject(err);
						})

					return def.promise;
				},

				saveQuestion: function (params) {
					var def = $q.defer();
					var questionModel = this.newQuestion(params);

					questionModel.save()
						.then(function () {
							async.each(params.tags, function (tagId, callback) {
								/* GET for retrieving the tag count  */
								tagsService.getById(tagId)
									.then(function (tag) {
										var count = tag.get('count') || 0;

										tag.set('count', ++count);
										tag.save()
											.then(function () {
												callback();
											}).catch(function (err) {
												callback(err);
											});
									});
							}, function (err) {
								if (err) {
									def.reject(err);
								} else {
									usersService.getById(questionModel.get('author'))
										.then(function (userModel) {
											questionModel.set('author', userModel);
										})
										.then(function () {
											if (questionModel.get('tags').length) {
												tagsService.getById(questionModel.get('tags')[0])
													.then(function (tagModel) {
														questionModel.set('tags', [tagModel]);
														questionsLoaded.add(questionModel);
														def.resolve(questionModel);
													})
											} else {
												questionsLoaded.add(questionModel);
												def.resolve(questionModel);
											}
										})
										.catch(function (err) {
											def.reject(err);
										})
								}
							});
						}).catch(function (err) {
							def.reject(err);
						});

					return def.promise;
				},

				submitAnswer: function (question, nAnswer) {
					var newAnswers = question.get('answers');
					newAnswers.push(nAnswer);
					question.set('answers', newAnswers)

					return this.updateModel(question, ['answers']);
				}

			};
	}]);