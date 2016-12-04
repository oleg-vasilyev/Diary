/*jshint esversion: 6 */
(function() { 'use strict'; }());

angular.module('dairyApp').
    service('tasksStoreService', function() {
        let localStorageKey = 'dairyTasks';

        return {
            getlocalStorageKey() {
              return localStorageKey;
            },
            getTasksFromStore() {
              let tasks = JSON.parse(localStorage.getItem(localStorageKey));
              return tasks;
            },
            sendTasksToStore(tasks) {
              let serialTasks = JSON.stringify(tasks);
              localStorage.setItem(localStorageKey, serialTasks);
            }
          };
      });
