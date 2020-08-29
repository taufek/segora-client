'use strict';

angular.module("segoraClientApp")
.constant('Settings', {
    appName: "SEGORA",
    backendHost: process.env.TIMES || "https://segora-services.herokuapp.com",
    // backendHost: "http://localhost:3000",
    rowCount: 10
});
