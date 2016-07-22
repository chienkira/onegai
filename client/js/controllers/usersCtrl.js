/*global angular*/
'use strict';
angular
  .module('onegai')
  .controller('usersCtrl', ['usersService',
    function (usersService) {
      var usersModel = this;

      usersModel.sort = 'karma DESC';
      usersModel.searchKey = '';
      usersModel.users = [];
      usersModel.page = 1;
      usersModel.per_page = 20;
      usersModel.total_count = usersModel.per_page;
      usersModel.total_page = Math.floor(usersModel.total_count / usersModel.per_page) + 1;

      /* Count number of existing users on database */
      usersModel.countUsers = function () {
        usersService.customGET('count', {where: usersModel.whereCond})
          .then(function (result) {
            usersModel.total_count = result.count;
            usersModel.total_page = Math.floor(usersModel.total_count / usersModel.per_page) + 1;
          });
      };

      /* Load users given a sort parameter */
      usersModel.loadUsers = function (params) {
        usersModel.countUsers();
        usersModel.userPromise = usersService.getList({filter: params});
        usersModel.userPromise.then(
          function (result) {
            result = addDisplayName(result);
            if (usersModel.users.add) {
              result.forEach(function (item) {
                usersModel.users.add(item);
              })
            } else {
              usersModel.users = result;
            }
            usersModel.users = convertToRowsOf4(usersModel.users);
          },
          function (res) {
            usersModel.users = [];
          });
      };

      /* Listener on pagination */
      usersModel.loadPage = function (page) {
        usersModel.page = page;
        var params = {
          order: usersModel.sort,
          skip: (usersModel.page - 1) * usersModel.per_page,
          limit: usersModel.per_page
        };
        usersModel.loadUsers(params);
      };

      /* Listener on tab */
      usersModel.sortUser = function (sortOn) {
        usersModel.page = 1;
        usersModel.whereCond = {};
        switch (sortOn) {
          case 'newest':
            usersModel.sort = 'createdat DESC';
            break;
          case 'votes':
            usersModel.sort = 'karma DESC';
            break;
          default:
            usersModel.sort = 'karma DESC';
            break;
        }
        usersModel.loadUsers({
          order: usersModel.sort,
          skip: (usersModel.page - 1) * usersModel.per_page,
          limit: usersModel.per_page
        });
      };

      /* Handles search */
      usersModel.searchUser = function () {
        var reg = '%' + usersModel.searchKey + '%';
        var query = {
          where: {
            or: [
              {username: {like: reg}},
              {firstname: {like: reg}},
              {lastname: {like: reg}}
            ]
          }
        };
        usersModel.userPromise = usersService.getList({filter: query});
        usersModel.userPromise.then(function (response) {
          response = addDisplayName(response);
          usersModel.users = convertToRowsOf4(response);
        });
      };

      /*  */
      function convertToRowsOf4(list) {
        var newList = [];
        var row;

        for (var i = 0; i < list.length; i++) {
          if (i % 4 == 0) { // every 4rd one we're going to start a new row
            if (row instanceof Array) {
              newList.push(row); // if the row exists add it to the newList
            }
            row = []; // initalize new row
          }

          row.push(list[i]); // add each item to the row
        }

        if (row.length > 0)
          newList.push(row);

        return newList;
      }

      function addDisplayName(result) {
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
        return result;
      }


      usersModel.loadUsers();
    }
  ]);
