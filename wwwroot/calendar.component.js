/*jshint esversion: 6 */
(function() { 'use strict'; }());

angular.module('dairyApp').
  component('calendar', {
    templateUrl: 'wwwroot/calendar.html',
    controller: function(dairyService, $scope) {

      $scope.daysOfTheWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
      $scope.isCalendarOpen = false;

      onSelectedDateAsLineUpdated(dairyService.getSelectedDateAsLine());
      dairyService.selectedDateAsLineUpdated(onSelectedDateAsLineUpdated);

      $scope.toPrevMonthClick = function() {
        let [
          ,
          monthOfSelectedDate,
          yearOfSelectedDate
        ] = dairyService.getSelectedDateAsLine().split('.');
        let currentSelectedDate = new Date(yearOfSelectedDate, monthOfSelectedDate - 1, 1);
        let newSelectedDate = new Date(currentSelectedDate);
        newSelectedDate.setMonth(currentSelectedDate.getMonth() - 1);
        dairyService.changeSelectedDateAsLine(
          `${newSelectedDate.getDate()}.${newSelectedDate.getMonth() + 1}.${newSelectedDate.getFullYear()}`
          );
      };

      $scope.toNextMonthClick = function() {
        let [
          ,
          monthOfSelectedDate,
          yearOfSelectedDate
        ] = dairyService.getSelectedDateAsLine().split('.');
        let newSelectedDate = new Date(yearOfSelectedDate, monthOfSelectedDate, 1);
        dairyService.changeSelectedDateAsLine(
          `${newSelectedDate.getDate()}.${newSelectedDate.getMonth() + 1}.${newSelectedDate.getFullYear()}`
        );
      };

      $scope.toThisDayClick = function() {
        let today = new Date();
        dairyService.changeSelectedDateAsLine(
          `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`
          );
      }

      $scope.dayClick = function(dayOfMonth, isDayInSelectedMonth) {
        if (isDayInSelectedMonth) {
          let [day, monthOfSelectedDate, yearOfSelectedDate] = dairyService.getSelectedDateAsLine().split('.');
          dairyService.changeSelectedDateAsLine(
            `${dayOfMonth}.${monthOfSelectedDate}.${yearOfSelectedDate}`
            );
          $scope.isCalendarOpen = false;
        }
      };

      function onSelectedDateAsLineUpdated(selectedDateAsLine) {
        let [dayOfSelectedDate, monthOfSelectedDate, yearOfSelectedDate] = selectedDateAsLine.split('.');
        $scope.selectedDateAsLine = selectedDateAsLine;
        $scope.dayOfSelectedDate = dayOfSelectedDate;
        $scope.monthOfSelectedDate = getSelectedMonthByDate(monthOfSelectedDate - 1);
        $scope.yearOfSelectedDate = yearOfSelectedDate;
        $scope.calendar = getCalendar(monthOfSelectedDate, yearOfSelectedDate);
      }

      function getSelectedMonthByDate(monthOfSelectedDate) {
        let months = [
          'Январь', 'Февраль', 'Март',
          'Апрель', 'Май', 'Июнь',
          'Июль', 'Август', 'Сентябрь',
          'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        return months[monthOfSelectedDate];
      }

      function getCalendar(monthOfSelectedDate, yearOfSelectedDate) {
        let firstDayOfSelectedMonth = new Date(yearOfSelectedDate, monthOfSelectedDate - 1, 1);

        let firstCalendarDay;
        for (
          firstCalendarDay = firstDayOfSelectedMonth;
          firstCalendarDay.getDay() !== 1;
          firstCalendarDay = new Date(firstCalendarDay.getTime() - 86400000)
        ) { }

        let allCalendarDays = [];
        for (let i = 0; i < 42; i++) {
          let newCalendarDay = new Date(firstCalendarDay.getTime() + 86400000 * i);
          allCalendarDays.push(
            {
              dayOfMonth: newCalendarDay.getDate(),
              isDayInSelectedMonth:
              (newCalendarDay.getMonth() + 1) == monthOfSelectedDate
            });
        }

        let calendar = [];
        for (let i = 0; i < 6; i++) {
          calendar.push([]);
          for (let j = 0; j < 7; j++) {
            calendar[i].push(allCalendarDays[i * 7 + j]);
          }
        }
        return calendar;
      }
    }
  });
