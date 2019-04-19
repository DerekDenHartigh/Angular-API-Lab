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
        $scope.feed = []; // resets the feed so that you don't just stack posts up, delete if you want a never ending page
        return $q(function(resolve, reject) {  // $q sets up a promise, after redditAPI is called successfully it executes the then()
                RedditService.callRedditApi()  // response is what the callRedditApi() returns?
                .then( (response) => {
                    console.log(response);
                    let n = 0;

                    while(n < 10){ // to limit it to 10 posts

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

    ctrl.changeThread = (newThread)=>{
        RedditService.changeThread(newThread)
        .then( ()=> {
            console.log('feed successfully changed');
            ctrl.runRedditFeed();
        })
        .catch((err)=> {
            console.error(err);
            alert("That isn't a real thread");
        })
    };

    // ctrl.runRedditFeed();  // auto fills w/ default aww stuff specified in the service

}


angular
.module('RedditApp')  
.component('redditFeed', {
    template: `
    <div id="feed-selector">
    <input id="feed-input" type="text" placeholder="input a thread:  r/______?" ng-model="$ctrl.thread">
    <button id="feed-button" ng-click="$ctrl.changeThread($ctrl.thread)">Feed Me</button>
    </div>

    <div class="post-container" ng-repeat="post in feed">
        <h1 class="post-title">{{post.title}}</h1>
        <!--<img src="{{post.imgURL}}" class="post-image"></img>-->  <!--higher quality, less likely to load-->
        <a target="_blank" href="https://reddit.com{{post.link}}"><img src="{{post.backupImg}}" class="post-image"></img></a>      <!--lower quality, always loads-->
        <a class="post-link" target="_blank" href="https://reddit.com{{post.link}}">Link 2 teh Sauce</a>
    </div>
    `,
    controller: redditFeed,
    bindings: {
        thread: "@" //    3. Create and modify the redditFeed component to take a one-way (<) or string (@) binding for the subreddit name?
    }
});