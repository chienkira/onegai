/*global angular*/
'use strict';

angular
	.module('stack.service')
	.factory('tagsService', ['$q', '$stamplay', function ($q, $stamplay) {
		var tags = $stamplay.Cobject('tag').Collection;

		return {

			getTags: function (options) {
				var def = $q.defer();

				if (tags.length) {
					def.resolve(tags)
				} else {
					options = options || {};
					tags.fetch(options)
						.then(function () {
							def.resolve(tags);
						})
						.catch(function (err) {
							def.reject(err);
						});
				}

				return def.promise;
			},

			getById: function (tagId) {
				var def = $q.defer();
				var tag = $stamplay.Cobject('tag').Model;

				if (tags.get(tagId)) {
					def.resolve(tags.get(tagId));
				} else {
					tag.fetch(tagId)
						.then(function () {
							def.resolve(tag);
						})
						.catch(function (err) {
							def.reject(err);
						});
				}

				return def.promise;
			},

			searchTag: function (params) {
				var fetched = $stamplay.Cobject('tag').Collection;
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