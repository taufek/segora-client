'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserUploadCtrl
 * @description
 * # UserUploadCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('UserUploadCtrl', function ($scope, Settings, $upload, UploadService, $timeout, StatusService, FlashService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.fileTypes = [
      {id: "user_upload", value: "Users"},
      {id: "payment_upload", value: "Payments"}
    ];

    $scope.selectedType = "payment_upload";

    var uploadAction = Settings.backendHost + '/' + $scope.selectedType;

    var updateUploadData = function(uploadId){
      $timeout(function(){
        UploadService.getById(uploadId, function(upload){
          console.log(JSON.stringify($scope.uploadDataTemp) === JSON.stringify(upload));
          if(JSON.stringify($scope.uploadDataTemp) === JSON.stringify(upload)){

            FlashService.setMessage('Done.', 'success', true);
            StatusService.stop();
          }            
          else{
            $scope.uploadData = upload;
            $scope.uploadDataTemp = angular.copy(upload);
            updateUploadData(uploadId);
          }
        });
        
      },2000);

    }

    $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: uploadAction, //upload.php script, node.js route, or servlet url
        //method: 'POST' or 'PUT',
        //headers: {'header-key': 'header-value'},
        //withCredentials: true,
        data: {myObj: $scope.myModelObj},
        file: file, // or list of files ($files) for html5 only
        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Disposition'), server side file variable name. 
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
      }).progress(function(evt) {
        StatusService.start();
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
        updateUploadData(data.upload_id);
        
      });
      //.error(...)
      //.then(success, error, progress); 
      // access or attach event listeners to the underlying XMLHttpRequest.
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})
    }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  };
  });
