angular
	.module('stack')
	.controller('tagsCtrl', ['tagsService', '$filter',
		function (tagsService, $filter) {
			var tagsModel = this;
			var orderBy = $filter('orderBy');


			tagsModel.orderTags = function (predicate) {
				switch (predicate) {
				case 'name':
					tagsModel.tags.instance.sort(function (a, b) {
						var nameA = a.get('name').toLowerCase();
						var nameB = b.get('name').toLowerCase();
						if (nameA < nameB) return -1;
						if (nameA > nameB) return 1;
						return 0;
					})
					tagsModel.order = 'name';
					break;

				case '-count':
					tagsModel.tags.instance.sort(function (a, b) {
						var countA = parseInt(a.get('count'));
						var countB = parseInt(b.get('count'));
						return countB - countA;
					})
					tagsModel.order = '-count';
					break;

				case '-dt_create':
					tagsModel.tags.instance.sort(function (a, b) {
						var dt_createA = a.get('dt_create');
						var dt_createB = b.get('dt_create');
						return new Date(dt_createB) - new Date(dt_createA);
					})
					tagsModel.order = '-dt_create';
					break;
				}

			};

			/* Handles the tag filtering options */
			tagsModel.sort = {
				popular: true,
				name: false,
				'-dt_create': false
			};
			tagsModel.order = '-count';

			/* The user search */
			tagsModel.searchTag = '';
			/* All tags, pagination in real world app */
			tagsService.getTags({
				sort: '-count'
			}).then(function (response) {
				/* tagsModel.tags are the visible tags*/
				tagsModel.tags = response;
				/* All tags, pagination in real world app */
				tagsModel.allTags = response;
			})

			/* Handles search */
			tagsModel.search = function () {
				var reg = '".*' + tagsModel.searchTag + '.*"';
				var query = {
					'where': '{"name": {"$regex" : ' + reg + '}}'
				};

				tagsService.searchTag(query).then(function (response) {
					tagsModel.tags = response;
				});
			};

	}])