/*jshint esversion: 6 */
(function () { 'use strict'; } ());

angular.module('dairyApp').
  component('taskList', {
    templateUrl: 'wwwroot/task-list.html',
    controller: function (dairyService, $scope) {
      onSelectedDateAsLineUpdated(dairyService.getSelectedDateAsLine());
      dairyService.selectedDateAsLineUpdated(onSelectedDateAsLineUpdated);
      onTasksUpdated(dairyService.getTasks());
      dairyService.tasksUpdated(onTasksUpdated);

      $scope.addTask = function (taskDate, taskNote) {
        dairyService.addTask(taskDate, taskNote);
        $scope.addTaskNoteModel = null;
      };

      $scope.removeTask = function (taskId) {
        dairyService.removeTask(taskId);
      };

      $scope.markTask = function (taskId, isDone) {
        dairyService.markTask(taskId, isDone);
      };

      $scope.updateTaskNote = function (taskId, newTaskNote) {
        dairyService.updateTaskNote(taskId, newTaskNote);
      };

      $scope.onSwipeLeft = function () {
        let [
          dayOfSelectedDate,
          monthOfSelectedDate,
          yearOfSelectedDate
        ] = dairyService.getSelectedDateAsLine().split('.');
        let currentSelectedDate = new Date(yearOfSelectedDate, monthOfSelectedDate - 1, dayOfSelectedDate);
        let newSelectedDate = new Date(currentSelectedDate);
        newSelectedDate.setDate(currentSelectedDate.getDate() + 1);
        dairyService.changeSelectedDateAsLine(
          `${newSelectedDate.getDate()}.${newSelectedDate.getMonth() + 1}.${newSelectedDate.getFullYear()}`
        );
      };

      $scope.onSwipeRight = function () {
        let [
          dayOfSelectedDate,
          monthOfSelectedDate,
          yearOfSelectedDate
        ] = dairyService.getSelectedDateAsLine().split('.');
        let currentSelectedDate = new Date(yearOfSelectedDate, monthOfSelectedDate - 1, dayOfSelectedDate);
        let newSelectedDate = new Date(currentSelectedDate);
        newSelectedDate.setDate(currentSelectedDate.getDate() - 1);
        dairyService.changeSelectedDateAsLine(
          `${newSelectedDate.getDate()}.${newSelectedDate.getMonth() + 1}.${newSelectedDate.getFullYear()}`
        );
      };

      function onSelectedDateAsLineUpdated(selectedDateAsLine) {
        $scope.selectedDate = selectedDateAsLine;
        dairyService.updateDailyTasks(selectedDateAsLine);
      }

      function onTasksUpdated(tasks) {
        $scope.tasks = tasks;
      }
    }
  });
