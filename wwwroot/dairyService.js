/*jshint esversion: 6 */
(function() { 'use strict'; }());

angular.module('dairyApp').
    service('dairyService', function(tasksStoreService) {

        let dairy = new Dairy(tasksStoreService.getTasksFromStore());
        let currentDate = new Date();
        let selectedDateAsLine = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
        let tasks = dairy.getDailyTasks(selectedDateAsLine);

        let onSelectedDateAsLineUpdatedCallbackArr = [];
        function notifyAboutSelectedDateAsLineUpdate() {
          for (let onSelectedDateAsLineUpdatedCallback of onSelectedDateAsLineUpdatedCallbackArr) {
            onSelectedDateAsLineUpdatedCallback(selectedDateAsLine);
          }
        }

        let onTasksUpdatedCallback;
        function notifyAboutTasksUpdate() {
          if (onTasksUpdatedCallback) {
            tasks = dairy.getDailyTasks(selectedDateAsLine);
            onTasksUpdatedCallback(tasks);
          }
        }

        function notifyAboutTasksUpdateAndUpdateTasksInStore() {
          tasksStoreService.sendTasksToStore(dairy.getAllTasks());
          notifyAboutTasksUpdate();
        }

        return {
            getSelectedDateAsLine() {
              return selectedDateAsLine;
            },
            changeSelectedDateAsLine(newSelectedDateAsLine) {
              selectedDateAsLine = newSelectedDateAsLine;
              notifyAboutSelectedDateAsLineUpdate();
            },
            selectedDateAsLineUpdated(callback) {
              onSelectedDateAsLineUpdatedCallbackArr.push(callback);
            },

            getTasks() {
              return tasks;
            },
            addTask(taskDate, taskNote) {
              dairy.addTask(taskDate, taskNote);
              notifyAboutTasksUpdateAndUpdateTasksInStore();
            },
            removeTask(taskId) {
              dairy.removeTask(taskId);
              notifyAboutTasksUpdateAndUpdateTasksInStore();
            },
            markTask(taskId, isDone) {
              dairy.markTask(taskId, isDone);
              notifyAboutTasksUpdateAndUpdateTasksInStore();
            },
            updateTaskNote(taskId, newTaskNote) {
              dairy.updateTaskNote(taskId, newTaskNote);
              notifyAboutTasksUpdateAndUpdateTasksInStore();
            },
            updateDailyTasks(date) {
              notifyAboutTasksUpdate();
            },
            tasksUpdated(callback) {
              onTasksUpdatedCallback = callback;
            }
          };
      });
