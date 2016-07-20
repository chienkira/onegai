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
  .controller('homeCtrl', ['questionsService', 'tagsService', 'usersService',
    function (questionsService, tagsService, userService) {
      var homeModel = this;

      homeModel.questions = [];
      homeModel.tags = [];
      homeModel.top_users = [];
      homeModel.page = 1;
      homeModel.per_page = 10;
      homeModel.total_count = homeModel.per_page;
      homeModel.total_page = homeModel.total_count / homeModel.per_page + 1;
      homeModel.sort = 'createdat DESC';

      /* Count number of existing questions on database */
      homeModel.countQuestions = function () {
        questionsService.customGET('count')
          .then(function (result) {
            homeModel.total_count = result.count;
            homeModel.total_page = homeModel.total_count / homeModel.per_page + 1;
          });
      };

      /* Load the questions given a sort parameter */
      homeModel.loadQuestions = function (params) {
        homeModel.questionsPromise = questionsService.getList({filter: params});
        homeModel.questionsPromise.then(
          function (result) {
            if (homeModel.questions.add) {
              result.forEach(function (item) {
                homeModel.questions.add(item);
              })
            } else {
              homeModel.questions = result;
              homeModel.totalLength = homeModel.questions.length;
            }
          },
          function (res) {
            homeModel.questions = [];
          });
      };

      /* Load Tags*/
      homeModel.loadTags = function () {
        tagsService.getList({filter: {limit: 30}})
          .then(function (result) {
            if (homeModel.tags.add) {
              result.forEach(function (item) {
                homeModel.tags.add(item);
              })
            } else {
              homeModel.tags = result;
            }
          });
      };

      /* Load Top Users */
      homeModel.loadTopUsers = function () {
        homeModel.topUsersPromise = userService.getList({
          filter: {
            field: {firstname: true, lastname: true, username: true, vote: true, votepoint: true, gender: true},
            order: 'vote DESC',
            limit: 7
          }
        });
        homeModel.topUsersPromise.then(function (result) {
          result.forEach(function (item) {
            item.display_name = "";
            if (item.firstname) {
              item.display_name += item.firstname;
            }
            if (item.lastname) {
              item.display_name += " " + item.lastname;
            }
            if (item.display_name.length === 0) {
              item.display_name = item.username;
            }
          });
          if (homeModel.top_users.add) {
            result.forEach(function (item) {
              homeModel.top_users.add(item);
            })
          } else {
            homeModel.top_users = result;
          }
        });
      };

      /* Listener on pagination */
      homeModel.loadPage = function (page) {
        homeModel.page = page;
        var params = {
          order: homeModel.sort,
          skip: (homeModel.page - 1) * homeModel.per_page,
          limit: homeModel.per_page
        };
        homeModel.loadQuestions(params);
      };

      /* Listener on tab */
      homeModel.sortQuestion = function (sortOn) {
        homeModel.page = 1;
        switch (sortOn) {
          case 'newest':
            homeModel.sort = 'createdat DESC';
            break;
          case 'votes':
            homeModel.sort = 'numbervote DESC';
            break;
          case 'unanswered':
            homeModel.sort = 'numberreply ASC';
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

      homeModel.countQuestions();
      homeModel.loadTags();
      homeModel.loadTopUsers();
      homeModel.sortQuestion();
    }
  ]);
