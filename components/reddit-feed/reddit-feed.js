"use strict";

function redditFeed(RedditService, $q) {  //nameDisplay is the name-display.js controller, I'm passing the NameService service function into the controller as a parameter
    const ctrl = this;
    ctrl.feed = [];//empty feed array to fill w/ reddit posts

/*
    ctrl.feed should be an array of obj (posts), like this:
    ctrl.feed = [
        {title: "",
        imgURL: ""}, rinse/repeat
    ]
*/

    // ctrl.data = RedditService.callRedditApi();

    ctrl.fillRedditFeed = () => {
        return $q(function(resolve, reject) {  // reject never specified?
                RedditService.callRedditApi()  // response is what the callRedditApi() returns?
                .then( (response) => {
                    console.log(response);
                    let n = 0;
                    while(n < 10){ // to limit it to 10 posts?
                    
                        // if (!response.data.children) { // this was to test out the catch
                        //     reject('failure, you are');
                        // }
                        ctrl.feed.push(  // to fill the feed with the post objects containing titles and images
                            {title:response.data.data.children[n].data.title,
                            imgURL:response.data.data.children[n].data.url}
                            );
                        
                            n++;

                        console.log(n);

                        if ( n=== 10 ) {
                            resolve();
                        }
                    }
                })  // so that it doesn't resolve before the loop has run
        });
    }

    ctrl.runRedditFeed = () => {
        ctrl.fillRedditFeed()
        .then( () => console.log('runRedditFeed() Success!'))  
        .catch( (err) => {  // in case things go wrong
            console.error(err);  // logs the wrench in my gears
            alert('runRedditFeed() failed');
        })
    }

    // ctrl.fillRedditFeed = () => {

    //     $q(function() {

    //     })
    //         RedditService.callRedditApi()  // response is what the callRedditApi() returns?
    //         .then( (response) => {
    //             console.log(response);
    //             let n = 0;
    //             while(n<10){ // to limit it to 10 posts?
    //                 ctrl.feed.push(  // to fill the feed with the post objects containing titles and images
    //                     {title:response.data.data.children[n].data.title,
    //                      imgURL:response.data.data.children[n].data.url}
    //                     );
    //                 n++;
    //             }
    //         }).then(resolve());  // so that it doesn't resolve before the loop has run
    //     };

}


angular
.module('RedditApp')  
.component('redditFeed', {
    template: `
    <button ng-click="$ctrl.runRedditFeed()">Feed ME</button>
    <div class="post-container" ng-repeat="post in crtl.feed">
        <h1 class="post-title">{{post.title}}<h1>
        <div class="post-image">{{post.imgURL}}<div>
    </div>
    `,
    controller: redditFeed,
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