let GitHub = require("gh.js");

const inst1 = new Vue({

    el: "#app",
    data: {

        query: "",
        emptyErr: false,
        usersData: [],
        cleanArr: [],
        lessThan10: [],
        // notFound: false

    },
    methods: {

        callAPI (query) {

            fetch(`https://api.github.com/search/users?q=${query}&sort=page=1&per_page=10`).then(res => {
        
                res.json().then(data=>{

                    this.usersData = data.items;

                    this.buildCards(this.usersData);

                    //console.log(this.usersData);
        
                });
        
            }).catch(err=>{
        
                throw err;
        
            });

        },

        callAPILess10 (query) {

            console.log(query);

            fetch(`https://api.github.com/search/users?q=${query}+followers:<10&sort=page=1&per_page=10`).then(res => {
        
                res.json().then(data=>{

                    this.lessThan10 = data.items;

                    console.log(data.items);

                    //this.buildCards(this.usersData);
        
                });
        
            }).catch(err=>{
        
                throw err;
        
            });

        },

        buildCards (arr) {

            console.log(this.usersData);

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

        lessThan10Button(e) {

            e.preventDefault();

            this.usersData = [];

            this.cleanArr = [];

            if (this.query === "") {

                this.emptyErr = true;

            } else {

                this.emptyErr = false;

                console.log(this.query);

                this.callAPILess10(this.query);

            }

        }

    }

});


