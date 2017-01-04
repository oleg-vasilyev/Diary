angular.module('dairyApp')
	.directive('cmpInputFile', () => {
		return {
			restrict: "A",
			scope: {
				"cmpInputFile": "&"
			},
			link: function (scope, element, attrs) {
				var inputElement = element[0];

				inputElement.onchange = function (arg) {
					scope.cmpInputFile({ files: inputElement.files });
				};
			}
		};
	})
	.directive('cmpUploadFiles', function () {
		return {
			templateUrl: 'wwwroot/cmp__upload_files/cmp__upload_files.html',
			restrict: "E",
			scope: {
				"newFiles": "&",
				"selectFileText": "@",
				"dropboxText": "@",
				"mask": "@"
			},
			link: function (scope, element, attrs) {

				scope.openDialogue = () => {
					element[0].querySelector('input').click();
				}

				scope.checkSelectedFiles = (files) => {
					let isWrongFileType = scope.mask === undefined;
					let fileIndex = 0;
					while (files[fileIndex] !== undefined && !isWrongFileType) {

						if (files[fileIndex].type !== "") {
							isWrongFileType = !~scope.mask.indexOf(files[fileIndex].type);
						}
						else {
							let splitedFileName = scope.mask.indexOf(files[fileIndex].name.split('.'));
							let fileExpansion = splitedFileName.length > 1 ? splitedFileName[splitedFileName.length - 1] : null
							isWrongFileType = !~scope.mask.indexOf(fileExpansion);
						}

						fileIndex++;
					}

					if (!isWrongFileType) {
						scope.newFiles({ files: files });
					}
					else {
						console.log("wrong type of file!")
					}
				}

				let dropbox = element[0].querySelector('.cmp__dropbox');
				let stopHandle = (evt) => {
					evt.stopPropagation();
					evt.preventDefault();
				}

				for (let eventName of ['dragenter', 'dragexit', 'dragover']) {
					dropbox.addEventListener(eventName, stopHandle, false);
				}

				dropbox.addEventListener('drop', function (evt) {
					stopHandle(evt)

					scope.checkSelectedFiles(evt.dataTransfer.files)

				}, false);
			}
		};
	});
