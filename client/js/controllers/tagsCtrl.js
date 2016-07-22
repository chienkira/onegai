angular
  .module('onegai')
  .controller('tagsCtrl', ['tagsService', '$filter',
    function (tagsService, $filter) {
      var tagsModel = this;
      var orderBy = $filter('orderBy');

      tagsModel.order = 'numberposts DESC';
      tagsModel.searchTag = '';
      tagsModel.tagsPromise = tagsService.getList({
        filter: {
          sort: 'numberposts DESC'
        }
      });
      tagsModel.tagsPromise.then(function (response) {
        tagsModel.tags = response;
      });

      /* Handles search */
      tagsModel.search = function () {
        var reg = '%' + tagsModel.searchTag + '%';
        var query = {
          where: {name: {like: reg}}
        };
        tagsModel.tagsPromise = tagsService.getList({filter: query});
        tagsModel.tagsPromise.then(function (response) {
          tagsModel.tags = response;
        });
      };

    }]);
