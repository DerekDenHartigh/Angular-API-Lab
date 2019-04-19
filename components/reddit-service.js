"use strict";

function RedditService($http) {

    const service = this;
    service.newThread = "aww";
    service.callRedditApi = () => {
        return $http.get('https://www.reddit.com/r/{{service.newThread}}.json') // what's the difference?

        // below are alternatives to the while loop I used in the controller

        // return $http.get('https://www.reddit.com/r/aww.json?limit=9')
        // return $http.get('https://www.reddit.com/r/aww.json, {
        //     Data: {
        //         limit: 10
        //     }
        // })

    };

    service.changeThread = (newThread)=>{
        service.newThread = newThread;
        console.log(`thread changed to `+service.newThread);
    }


}

angular
    .module("RedditApp")
    .service("RedditService", ["$http", RedditService]);