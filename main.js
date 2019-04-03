const inst1 = new Vue({

    el: "#app",
    data: {

        query: "",
        emptyErr: false,
        usersData: [],
        cleanArr: []

    },
    methods: {

        callAPI (query) {

            fetch(`https://api.github.com/search/users?q=${query}`).then(res => {
        
                res.json().then(data=>{

                    this.usersData = data.items;

                    this.buildCards(this.usersData);
        
                });
        
            }).catch(err=>{
        
                throw err;
        
            });

        },

        submitClick (e) {

            this.usersData = [];

            this.cleanArr = [];

            e.preventDefault();

            console.log(this.query);

            if (this.query === "") {

                this.emptyErr = true;

            } else {

                this.emptyErr = false;

                this.callAPI(this.query);

            }

        },

        buildCards (arr) {

            console.log(arr);

            arr.map(el => {

                let userObj = {};

                let avatar = el.avatar_url.replace(/"/, '');
                let followers = el.followers_url.length;
                let following = el.following_url.length;
                let repos = el.repos_url.length;

                userObj.avatar = avatar;
                userObj.followers = followers;
                userObj.following = following;
                userObj.repos = repos;

                this.cleanArr.push(userObj);

            });

            console.log(this.cleanArr);

        }

    }

});


