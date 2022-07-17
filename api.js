const axios = require('axios');
const {response} = require('express');

var api = {
    shuffle: async function () {

        
        try 
        { 
            console.log("shuffling");
        //return 
        let res = await axios({
        url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
        method: 'get',
        timeout: 8000,
        headers: {
            'Content-Type': 'application/json',
        }
    });
         if (res.status == 200){
            // test for status you want, etc
            console.log(res.status)
        }    
        // Don't forget to return something   
        return res.data
    }
    catch (err) {
        console.error(err);
    }
    },

    draw: function (deck_id) {

        console.log("drawing");
        //return 
        return axios.post('https://deckofcardsapi.com/api/deck/' +deck_id+'/draw/?count=1').then((out) => {
            console.log(out.data)
            return out.data;
        }).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
    }
}


module.exports = api;