"use strict";

function RedditService($http, $q) {

    const service = this;
    service.callRedditApi = () => {
        return $http.get(`https://www.reddit.com/r/${service.newThread}.json`) // what's the difference?

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

        return $q(function(resolve, reject) {  // $q sets up a promise, after redditAPI is called successfully it executes the then()
            RedditService.callRedditApi()  // response is what the callRedditApi() returns?
            .then( (response) => {
                if(service.newThread!==undefined){
                    resolve();
                }
                if(service.newThread==="" || service.newThread===undefined){
                    reject();
                }
            })  // so that it doesn't resolve before the loop has run
    });
    }


}

angular
    .module("RedditApp")
    .service("RedditService", ["$http", RedditService]);