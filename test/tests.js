/*jshint esversion: 6 */
(function() { 'use strict'; }());

describe('service:', function() {
    beforeEach(function() { module('dairyApp'); });

    let dairyService;
    beforeEach(inject(function(_dairyService_) {
        dairyService = _dairyService_;
      }));

    let tasksStoreService;
    beforeEach(inject(function(_tasksStoreService_) {
        tasksStoreService = _tasksStoreService_;
      }));

    describe('tasksStoreService', function() {
        it('should be defined', function() {
            expect(tasksStoreService).toBeDefined();
          });

        let localStorageKey;
        it('localStorageKey is defined', function() {
            localStorageKey = tasksStoreService.getlocalStorageKey();
            expect(localStorageKey).toBeDefined();
          });

        it('can send items to store', function() {
            let items = [
                {item: 'item'}
            ];
            tasksStoreService.sendTasksToStore(items);
            let itemsFromStore = JSON.parse(localStorage.getItem(localStorageKey));
            expect(itemsFromStore.item).toBe(items.item);
          });

        it('can get items from store', function() {
            let items = [
                {item: 'item'}
            ];
            let serialItems = JSON.stringify(items);
            localStorage.setItem(localStorageKey, serialItems);
            let itemsFromStore = tasksStoreService.getTasksFromStore();
            expect(itemsFromStore.item).toBe(items.item);
          });

      });

    describe('dairyService', function() {
        it('should be defined', function() {
            expect(dairyService).toBeDefined();
          });

        it('returns correct date format', function() {
            let dateAsLinesArray = dairyService.getSelectedDateAsLine().split('.');
            expect(dateAsLinesArray.length).toBe(3);
            let [dayOfSelectedDate, monthOfSelectedDate, yearOfSelectedDate] = dateAsLinesArray;
            let currentDate = new Date();
            expect(+dayOfSelectedDate).toBe(currentDate.getDate());
            expect(+monthOfSelectedDate - 1).toBe(currentDate.getMonth());
            expect(+yearOfSelectedDate).toBe(currentDate.getFullYear());
          });

        it('can change selected date', function() {
            let selectedDateAsLine = dairyService.getSelectedDateAsLine();
            let newDateAsLine = '12.12.2012';
            dairyService.changeSelectedDateAsLine(newDateAsLine);
            expect(dairyService.getSelectedDateAsLine()).toBe(newDateAsLine);
          });

        it('can add a task', function() {
            let dateAsLine = '12.12.2012';

            dairyService.addTask(dateAsLine, 'task 1');
            let tasksBefore = tasksStoreService.getTasksFromStore();
            dairyService.addTask(dateAsLine, 'task 2');
            let tasksAfter = tasksStoreService.getTasksFromStore();

            expect(tasksAfter.length).toBe(tasksBefore.length + 1);
          });
      });

  });

describe('component:', function() {
    beforeEach(function() { module('dairyApp'); });

    let dairyCtrl, dairyScope;
    beforeEach(inject(function($rootScope, $componentController) {
        dairyScope = $rootScope.$new();
        dairyCtrl = $componentController('dairy', {$scope: dairyScope}, {myBinding: '1.5'});
      }));

    describe('dairy', function() {
        it('should be defined', function() {
            expect(taskListScope).toBeDefined();
            expect(taskListCtrl).toBeDefined();
          });
      });

    let calendarCtrl, calendarScope;
    beforeEach(inject(function($rootScope, $componentController) {
        calendarScope = $rootScope.$new();
        calendarCtrl = $componentController('calendar', {$scope: calendarScope}, {myBinding: '1.5'});
      }));

    describe('calendar', function() {
        it('should be defined', function() {
            expect(calendarScope).toBeDefined();
            expect(calendarCtrl).toBeDefined();
          });

        it('toPrevMonthClick is work', function() {
            let [, monthOfSelectedDate,] = calendarScope.selectedDateAsLine.split('.');
            calendarScope.toPrevMonthClick();
            let [, prevMonthOfSelectedDate,] = calendarScope.selectedDateAsLine.split('.');
            if (prevMonthOfSelectedDate == 12) {
              expect(+monthOfSelectedDate).toBe(1);
            } else {
              expect(+monthOfSelectedDate - +prevMonthOfSelectedDate).toBe(1);
            }
          });

        it('toNextMonthClick is work', function() {
            let [, monthOfSelectedDate,] = calendarScope.selectedDateAsLine.split('.');
            calendarScope.toNextMonthClick();
            let [, nextMonthOfSelectedDate,] = calendarScope.selectedDateAsLine.split('.');
            if (nextMonthOfSelectedDate == 1) {
              expect(+monthOfSelectedDate).toBe(12);
            } else {
              expect(+nextMonthOfSelectedDate - +monthOfSelectedDate).toBe(1);
            }
          });
      });

    let taskListCtrl, taskListScope;
    beforeEach(inject(function($rootScope, $componentController) {
        taskListScope = $rootScope.$new();
        taskListCtrl = $componentController('taskList', {$scope: taskListScope}, {myBinding: '1.5'});
      }));

    describe('taskList', function() {
        it('should be defined', function() {
            expect(taskListScope).toBeDefined();
            expect(taskListCtrl).toBeDefined();
          });
      });
  });
