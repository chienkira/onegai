/*global angular, async*/
'use strict';

angular
  .module('onegai.service')
  .factory('questionsService', ['$q', 'usersService', 'tagsService', 'answersService', 'Restangular',
    function ($q, usersService, tagsService, answersService, Restangular) {

      //Use Restangular
      var factory = Restangular.service("posts");

      factory.validateData = function(question) {
      };

      factory.getQuestions = function (param) {
      };

      factory.searchQuestion = function (questionId) {

      };

      factory.getById = function (questionId) {

      };

      factory.newQuestion = function (params) {

      };

      factory.updateViews = function (question) {

      };

      factory.updateModel = function (question, attrs) {

      };

      factory.voteUp = function (qModel) {

      };

      factory.voteDown = function (qModel) {

      };

      factory.commentQuestion = function (qModel, commentText) {

      };

      factory.saveQuestion = function (params) {

      };

      factory.submitAnswer = function (question, nAnswer) {

      };

      return factory;
    }]);
