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

                    // console.log(this.usersData);

                    this.buildCards(this.usersData);
        
                });
        
            }).catch(err=>{
        
                throw err;
        
            });

        },

        submitClick (e) {

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

            const userObj = {};

            arr.map(el => {

                const avatar = el.avatar_url;
                const followers = el.followers_url;
                const following = el.following_url;
                const repos = el.repos_url;

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


// fetch(`https://api.kanye.rest`).then(res=>{

//             res.json().then(data=>{
                
//                 this.setState({quote: data.quote});
            
//                 this.speaKanye(this.state.quote);

//             });

//         }).catch(err=>{

//             throw err;

//         });