"use strict";

function redditFeed(RedditService, $q, $scope) {  //nameDisplay is the name-display.js controller, I'm passing the NameService service function into the controller as a parameter
    const ctrl = this;
    $scope.feed = [];//empty feed array to fill w/ reddit posts

/*
    ctrl.feed should be an array of obj (posts), like this:
    ctrl.feed = [
        {title: "",
        imgURL: "",
        link: ""}, rinse/repeat
    ]
*/

    ctrl.fillRedditFeed = () => {
        return $q(function(resolve, reject) {  // $q sets up a promise, after redditAPI is called successfully it executes the then()
                RedditService.callRedditApi()  // response is what the callRedditApi() returns?
                .then( (response) => {
                    console.log(response);
                    let n = 0;

// look into how to limiting request

                    while(n < 10){ // to limit it to 10 posts?
                    
                        // if (!response.data.children) { // this was to test out the catch
                        //     reject('failure, you are');
                        // }
                        $scope.feed.push(  // to fill the feed with the post objects containing titles and images
                            {title:response.data.data.children[n].data.title,
                            imgURL:response.data.data.children[n].data.url,
                            link:response.data.data.children[n].data.permalink,
                            backupImg: response.data.data.children[n].data.thumbnail}
                            );
                        
                            n++;

                        console.warn($scope.feed);

                        if ( n=== 10 ) {
                            resolve();
                        }
                    }
                })  // so that it doesn't resolve before the loop has run
        });
    }

    ctrl.runRedditFeed = () => {
        ctrl.fillRedditFeed()
        .then( () => console.log('runRedditFeed() Success!'))  // confirms successful resolution of fillRedditFeed() promise ($q)
        .catch( (err) => {  // in case things go wrong
            console.error(err);  // logs the wrench in my gears
            alert('runRedditFeed() failed');
        })
    }

    ctrl.runRedditFeed();
}


angular
.module('RedditApp')  
.component('redditFeed', {
    template: `
    <div class="post-container" ng-repeat="post in feed">
        <h1 class="post-title">{{post.title}}</h1>
        <!--<img src="{{post.imgURL}}" class="post-image"></img>-->  <!--higher quality, less likely to load-->
        <a target="_blank" href="https://reddit.com{{post.link}}"><img src="{{post.backupImg}}" class="post-image"></img></a>      <!--lower quality, always loads-->
        <a class="post-link" target="_blank" href="https://reddit.com{{post.link}}">Link 2 teh Sauce</a>
        
    </div>
    `,
    controller: redditFeed
});

/* star wars coomponents/controllers:

function Crawler(StarWarsService, $q, $timeout, $rootScope) {
    const ctrl = this;
    
    ctrl.$onInit = function() {
        ctrl.crawler = [];
        ctrl.show = false;
    };

    $rootScope.$on("$locationChangeSuccess", function(value) {
        ctrl.crawler = [];
        ctrl.show = false;

        ctrl.getStarWarsCrawler()
        .then( _ => ctrl.show = true ); 
    });

    ctrl.getStarWarsCrawler = () => {
        // call star wars API
        // attach to template one by one
        return $q(function(resolve, reject) {
             StarWarsService.callStarWarsAPI()
            .then( (response) => {
                ctrl.crawler.push(`Episode ${response.data.episode_id}: ${response.data.title}`);

                let crawlerData = response.data.opening_crawl.split('\n');
                ctrl.addToCrawler(crawlerData, 0, resolve);
            });   
        });
    }

    ctrl.nextEpisode = () => {
        StarWarsService.nextEpisode();
    }

    ctrl.previousEpisode = () => {
        StarWarsService.previousEpisode();
    }

    ctrl.addToCrawler = (crawlerData, index, resolve) => {

        if ( index === crawlerData.length ) {
            $timeout( () => {
                resolve();
            }, 800)
        } else {
            $timeout( () => {
                ctrl.crawler.push(crawlerData[index]);
            }, 800)
            .then( _ => {
                index++;
            
                ctrl.addToCrawler(crawlerData, index, resolve)
             })
        }
    }
  }
  
  angular.module('StarWarsCrawler').component('crawler', {
    template: `
    
        <p ng-repeat="text in $ctrl.crawler track by $index">{{text}}</p>
        <p ng-if="$ctrl.show">
            <button ng-click="$ctrl.previousEpisode()">Previous Episode</button> 
            <button ng-click="$ctrl.nextEpisode()">Next Episode</button> 
        </p>

    `, // or use templateUrl
    controller: Crawler,
    bindings: {
      me: '<',
      onDelete: '&',
      onUpdate: '&'
    }
});



function EpisodeCounter(StarWarsService, $rootScope) {
    const ctrl = this;
    
    ctrl.getEpisode = function() {
        return StarWarsService.getEpisode();
    };

    $rootScope.$on("$locationChangeSuccess", function(value) {
        ctrl.getEpisode()
    });
  }
  
  angular.module('StarWarsCrawler').component('episodeCounter', {
    template: `
        <h2> Movie #{{$ctrl.getEpisode()}} </h2>
    `, // or use templateUrl
    controller: EpisodeCounter,
});
*/

/* from api-lab using jquery

    $.get("https://www.reddit.com/r/aww/new.json", (data)=>{
        console.log(data);
        let title, thumb, link;
        let child = data.data.children;
        let n=0;
        while (n<10){ // this is for the bonus - limiting it to 10 posts
            child = data.data.children[n];
            title = child.data.title;
            thumb = child.data.thumbnail;
            link = child.data.permalink;
            console.log(thumb);
            $("body").append(`<h1 id="${n}">${title}</h1>`);
            $("body").append(`<div id="${n}"> <img src="${thumb}" width="300px" height="300px"/>`);
            $("body").append(`<a href="https://reddit.com${link}">Click Here for OP</a></div>`);
            $(`#${n}`).css("background-color", `#${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`)
            $(`#${n}`).css("color", `#${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`);
                // I was trying to do random colors for each post, but it seems to do it for all.
            n++;
        };

*/