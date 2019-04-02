const inst1 = new Vue({

    el: "#app",
    data: {

        query: ""

    },
    methods: {

        callAPI (query) {

            fetch(`https://api.github.com/search/users?q=${query}`).then(res => {
        
                res.json().then(data=>{
        
                    console.log(data);
        
                });
        
            }).catch(err=>{
        
                throw err;
        
            });

        },

        submitClick (e) {

            e.preventDefault();

            console.log(this.query);

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