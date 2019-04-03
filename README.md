# Technical test for Vue developer position

This is a Vue app that I built for a technical interview, for a Vue developer position. The requirements were straightforward: build a front-end search engine with the Github API. The main feature needed was a "search by user" system. Then, it required three other features to filter the initial results by follower count.

This was one of the first times that I've used Vue.js to build something significant. I didn't really have much trouble with the framework but I didn't get into state management in this project. I would like to explore `vuex` in future projects.

However, using the Github API tripped me up quite a bit because of the massive amount of information that each request delivers. Getting the actual number count of followers, followees and repos for each user, was very tricky. The initial request returned a massive object with all the relevant information stored in other API endpoints. Initially, I simply sought the array length of these other API endpoints and concluded that I had gotten the right amount. But upon closer inspection a few hours later, I realized that I had completely ignored the Github API pagination settings. So then I spent a few hours reading up on the API's pagination settings to no avail. Ultimately, I found a very easy-to-use package: [gh.js](https://github.com/IonicaBizau/gh.js). It returned information exactly as I needed it. But because this was a Node package, I had to also install Browserify to bundle my HTML file, so that it could use the module correctly. 

I hope to use `vue-cli` for future Vue projects but given the limited amount of time for this test, I wanted to build something quick and functional. I think I achieved that with this project.

_To run the project, clone the repo, run `npm i` in the project directory and open `index.html` in your browser. Remember that if you make any changes to the JavaScript, you need to re-bundle the file by running `browserify main.js -o bundle.js`._


