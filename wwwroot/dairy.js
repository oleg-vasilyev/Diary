/*jshint esversion: 6 */
(function () { 'use strict'; } ());

class Dairy {
	constructor(tasks) {
		this.Tasks = tasks === null ? [] : tasks;
	}

	getAllTasks() {
		return this.Tasks;
	}

	addTask(taskDate, taskNote) {
		if (!taskNote || taskNote === '') {
			return;
		}
		let guidGenerator = new GuidGenerator();
		let task = new Task(guidGenerator.generate(), taskDate, taskNote);
		this.Tasks.push(task);
	}

	removeTask(taskId) {
		if (!this.Tasks || this.Tasks === null) {
			return;
		}
		for (let task of this.Tasks) {
			if (task.id === taskId) {
				let index = this.Tasks.indexOf(task);
				this.Tasks.splice(index, 1);
				break;
			}
		}
	}

	markTask(taskId, isDone) {
		if (!this.Tasks || this.Tasks === null) {
			return;
		}
		for (let task of this.Tasks) {
			if (task.id === taskId) {
				task.isDone = isDone;
				break;
			}
		}
	}

	updateTaskNote(taskId, newTaskNote) {
		if (!newTaskNote || newTaskNote === '') {
			return;
		}
		if (!this.Tasks || this.Tasks === null) {
			return;
		}
		for (let task of this.Tasks) {
			if (task.id === taskId) {
				task.note = newTaskNote;
				break;
			}
		}
	}

	getDailyTasks(date) {

		if (!this.Tasks || this.Tasks === null) {
			return;
		}
		let dailyTasks = [];
		for (let task of this.Tasks) {
			if (task.date === date) {
				dailyTasks.push(task);
			}
		}
		return dailyTasks;
	}
}
