const inst1 = new Vue({

    el: "#app",
    data: {

        query: "",
        emptyErr: false,
        usersData: [],
        cleanArr: [],
        // lessThan10: [],
        // notFound: false

    },
    methods: {

        callAPI (query) {

            fetch(`https://api.github.com/search/users?q=${query}&sort=page=1&per_page=10`).then(res => {
        
                res.json().then(data=>{

                    this.usersData = data.items;

                    this.buildCards(this.usersData);
        
                });
        
            }).catch(err=>{
        
                throw err;
        
            });

        },

        callAPILess10 (query) {

            fetch(`https://api.github.com/search/users?q=${query}+followers:10&sort=page=1&per_page=10`).then(res => {
        
                res.json().then(data=>{

                    this.usersData = data.items;

                    this.buildCards(this.usersData);
        
                });
        
            }).catch(err=>{
        
                throw err;
        
            });

        },

        submitClick (e) {

            e.preventDefault();

            this.usersData = [];

            this.cleanArr = [];

            console.log(this.query);

            if (this.query === "") {

                this.emptyErr = true;

            } else {

                this.emptyErr = false;

                this.callAPI(this.query);

            }

        },

        buildCards (arr) {

            this.notFound = false;

            console.log(arr);

            arr.map((el, key) => {

                let userObj = {};

                let id = key;
                let avatar = el.avatar_url.replace(/"/, '');
                let followers = el.followers_url;
                let following = el.following_url;
                let repos = el.repos_url;

                console.log(following);

                // fetch(followers).then(res => {

                //     res.json().then(data=>{

                //         userObj.followers = data.length;

                //     });

                // });

                // fetch(following).then(res => {

                //     res.json().then(data=>{

                //         userObj.following = data.length;

                //     });

                // });

                // fetch(repos).then(res => {

                //     res.json().then(data=>{

                //         userObj.repos = data.length;

                //     });

                // });

                userObj.id = id;
                userObj.avatar = avatar;

                this.cleanArr.push(userObj);

            });

            console.log(this.cleanArr);

        },

        lessThan10Button(e) {

            e.preventDefault();

            this.usersData = [];

            this.cleanArr = [];

            if (this.query === "") {

                this.emptyErr = true;

            } else {

                this.emptyErr = false;

                this.callAPILess10(this.query);

            }

        }

    }

});


