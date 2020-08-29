'use strict';

angular.module("segoraClientApp")
.constant('Settings', {
    appName: "SEGORA",
    backendHost: process.env.BACKEND_HOST || "https://segora-services.herokuapp.com",
    // backendHost: "http://localhost:3000",
    rowCount: 10
});
