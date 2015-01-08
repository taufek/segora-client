'use strict';

angular.module('segoraClientApp')
    .factory('UploadService', function($resource, $http, Settings) {
       
        var Upload = $resource(
            Settings.backendHost+'/collections/upload/:uploadId', {
                uploadId: '@id'
            }, {
                'save': {
                    method: 'POST',
                    isArray: true
                },
                'update': {
                    method: 'PUT'
                }
            }
        );


        // Public API here
        return {
            
            list: function(fn) {
                var uploads = Upload.query(function() {
                    fn(uploads);
                },
                function(err){
                    console.log(err);
                });
            },
            getById: function(id, fn) {
                Upload.get({
                    uploadId: id
                }, function(upload) {
                    fn(upload);
                });
            },
            createNew: function(fn) {
                fn(new Upload());
            },
            save: function(uploadData, fn) {
                var upload = angular.copy(uploadData);
                upload.$save()
                    .then(function(o, res) {
                        fn(o);
                    });
                // .catch(function(req) {  })
                // .finally(function()  { 
            },
            update: function(uploadData, fn) {
                var upload = angular.copy(uploadData);
                upload._id = undefined;
                upload.$update({
                    'uploadId': uploadData._id,
                    'test': true
                    })
                    .then(function(o, res) {
                        fn();
                    });
            },            
            remove: function(uploadData, fn) {
                var upload = angular.copy(uploadData);
                upload._id = undefined;
                upload.$remove({
                    'groupId': groupData._id
                    })
                    .then(function(o, res) {
                        fn();
                    });
            }
        };
    });
