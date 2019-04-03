let GitHub = require("gh.js");

const inst1 = new Vue({

    el: "#app",
    data: {

        query: "",
        emptyErr: false,
        usersData: [],
        cleanArr: [],
        //lessThan10: [],
        // notFound: false

    },
    methods: {

        callAPI (query) {

            fetch(`https://api.github.com/search/users?q=${query}&sort=page=1&per_page=1`).then(res => {
        
                res.json().then(data=>{

                    this.usersData = data.items;

                    this.buildCards(this.usersData);
        
                });
        
            }).catch(err=>{
        
                throw err;
        
            });

        },

        callAPILess10 (query) {

            console.log(query);

            fetch(`https://api.github.com/search/users?q=${query}+followers:<10&sort=page=1&per_page=10`).then(res => {
        
                res.json().then(data=>{

                    this.usersData = data.items;

                    this.buildCards(this.usersData);
        
                });
        
            }).catch(err=>{
        
                throw err;
        
            });

        },

        callAPI10To100 (query) {

            console.log(query);

            fetch(`https://api.github.com/search/users?q=${query}+followers:10..100&sort=page=1&per_page=10`).then(res => {
        
                res.json().then(data=>{

                    this.usersData = data.items;

                    this.buildCards(this.usersData);
        
                });
        
            }).catch(err=>{
        
                throw err;
        
            });

        },

        callAPIOver100 (query) {

            console.log(query);

            fetch(`https://api.github.com/search/users?q=${query}+followers:>100..100&sort=page=1&per_page=10`).then(res => {
        
                res.json().then(data=>{

                    this.usersData = data.items;

                    this.buildCards(this.usersData);
        
                });
        
            }).catch(err=>{
        
                throw err;
        
            });

        },

        buildCards (arr) {

            this.notFound = false;

            arr.map((el, key) => {

                let gh = new GitHub({});

                let userObj = {};

                userObj.id = key;
                userObj.avatar = el.avatar_url.replace(/"/, '');
                let login = el.login;

                gh.get(`users/${login}`, (err, info)=>{

                    if (err) {

                        console.log(err);
    
                    } else {
    
                        userObj.login = login;
                        userObj.followers = JSON.parse(info.followers);
                        userObj.following = JSON.parse(info.following);
                        userObj.repos = JSON.parse(info.public_repos);

                        this.cleanArr.push(userObj);
    
                    }

                });

            });

            console.log(this.cleanArr);

        },

        submitClick (e) {

            e.preventDefault();

            this.usersData = [];

            this.cleanArr = [];

            if (this.query === "") {

                this.emptyErr = true;

            } else {

                this.emptyErr = false;

                this.callAPI(this.query);

            }

        },

        innerButtons(e) {

            e.preventDefault();

            this.usersData = [];

            this.cleanArr = [];

            if (e.target.id == 1) {

                console.log(1);

                this.callAPILess10(this.query);

            } else if (e.target.id == 2) {

                console.log(2);

                this.callAPI10To100(this.query);

            } else {

                console.log(3);

                this.callAPIOver100(this.query);

            }

        }

    },

});


