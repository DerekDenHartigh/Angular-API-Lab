"use strict";

function RedditService(http) {

    const service = this;
    
    service.callRedditApi = () => {
        // return $http({
        //     method: "GET",
        //     url: "https://www.reddit.com/r/aww.json"
        // });
        return $http.get('https://www.reddit.com/r/aww.json') // what's the difference?
    };


}

angular
    .module("RedditApp")
    .service("RedditService", ["$http", RedditService]);

/*
Star Wars Service:
function StarWarsService($location, $http) {
    const service = this;

    service.getEpisode = () => {
        // Default to the good one
        let episode = 1;

        let hash =  Number.parseInt($location.hash());

        if ( service.validateEpisode(hash) ) {
            episode = hash;
        }

        return episode;
    };

    service.nextEpisode = () => {
        $location.hash(service.getEpisode() + 1);
    }

    service.previousEpisode = () => {
        $location.hash(service.getEpisode() - 1);
    }

    service.validateEpisode = (number) => {
        return Number.isInteger(number) && (number > 0) && (number < 9);
    };

    service.callStarWarsAPI = (episode) => {

        if ( typeof episode =='undefined' || !service.validateEpisode(episode) ) {
            episode = service.getEpisode();
        }

        return $http.get('https://swapi.co/api/films/' + episode);
    };

}

angular.module('StarWarsCrawler')
.service('StarWarsService', ['$location', '$http', StarWarsService])
*/