"use strict";

function RedditService($http) {

    const service = this;
    
    service.callRedditApi = () => {
        return $http.get('https://www.reddit.com/r/aww.json') // what's the difference?

        // below are alternatives to the while loop I used in the controller

        // return $http.get('https://www.reddit.com/r/aww.json?limit=9')
        // return $http.get('https://www.reddit.com/r/aww.json, {
        //     Data: {
        //         limit: 10
        //     }
        // })

    };


}

angular
    .module("RedditApp")
    .service("RedditService", ["$http", RedditService]);