angular
	.module('stack')
	.controller('answerEditCtrl', ['$scope', 'userService', 'answersService', 'questionsService', '$http',
		function ($scope, userService, answersService, questionsService, $http) {
			var answModel = this;

			if (userService.isLogged()) {

				answModel.newAnswer = {
					checked: false,
					text: ''
				};

				userService.getUserModel()
					.then(function (response) {
						answModel.user = response;
						answModel.newAnswer.author = response.get('id')
					})
			}

			answModel.successInCreation = false;
			answModel.errorInCreation = false;

			answModel.createAnswer = function (questionModel) {
				answersService.createAnswer(answModel.newAnswer)
					.then(function (nAnswer) {
						nAnswer.set('author', answModel.user);
						nAnswer.set('dt_create', moment(nAnswer.get('dt_create')).format('ll'));

						questionsService.submitAnswer(questionModel, nAnswer)
							.then(function () {
								answModel.successInCreation = true;

								$scope.$apply(function () {
									answModel.successInCreation = false;
									answModel.newAnswer.text = '';
								})
							})
							.catch(function (err) {
								answModel.errorInCreation = true;
								setTimeout(function () {
									answModel.successInCreation = false;
								}, 2000);
								alert('KO');
							});

					}).catch(function (err) {
						answModel.errorInCreation = true;
						alert('KO')
					});
			}

		}
	])