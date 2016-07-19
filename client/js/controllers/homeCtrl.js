/*global angular*/
'use strict';
/*
`homeModel` stores the `sort` criteria currently used to list the questions.
(I.E: `sort: {newest: true, votes: false, active:false}`.
When the controller starts `loadQuestion` is triggered and
it loads questions, their authors and also checks if a "checked"
(correct) answer already exists. `updateSortingOptions` is called
when we need to change the sort criteria.
*/
angular
	.module('onegai')
	.controller('homeCtrl', ['questionsService',
		function (questionsService) {
			var homeModel = this;

			homeModel.questions = [];
			homeModel.page = 1;
			homeModel.per_page = 10;
      homeModel.total_count = homeModel.per_page;
      homeModel.total_page = homeModel.total_count / homeModel.per_page;
			homeModel.sort = 'createdat DESC';

      /* Count number of existing questions on database */
      homeModel.countQuestions = function () {
        questionsService.customGET('count')
          .then(function (result) {
            homeModel.total_count = result.count;
            homeModel.total_page = homeModel.total_count / homeModel.per_page;
          });
      };

			/* Loads the questions given a sort parameter */
			homeModel.loadQuestions = function (params) {
				questionsService.getList({filter: params})
					.then(function (result) {
						if (homeModel.questions.add) {
							result.forEach(function (item) {
								homeModel.questions.add(item);
							})
						} else {
							homeModel.questions = result;
							homeModel.totalLength = homeModel.questions.length;
						}
					});
			};

			homeModel.loadPage = function (page) {
        homeModel.page = page;
        var params = {
          order: homeModel.sort,
          skip: (homeModel.page - 1) * homeModel.per_page,
          limit: homeModel.per_page
        }
        homeModel.loadQuestions(params);
			};

			/* Listener on tab */
			homeModel.sortQuestion = function (sortOn) {
				homeModel.page = 1;
				homeModel.questions = [];
				switch (sortOn) {
				case 'newest':
					homeModel.sort = 'createdat DESC';
					break;
				case 'votes':
					homeModel.sort = 'numbervote DESC';
					break;
				case 'unanswered':
					homeModel.sort = 'numberreply DESC';
					break;
				default:
					homeModel.sort = 'createdat DESC';
					break;
				}

				homeModel.loadQuestions({
					order: homeModel.sort,
					skip: (homeModel.page - 1) * homeModel.per_page,
					limit: homeModel.per_page
				});
			};

      homeModel.sortQuestion();
      homeModel.countQuestions();
		}
	]);
