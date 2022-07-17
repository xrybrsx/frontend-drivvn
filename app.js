'use strict';

const express = require('express');
const app = express();
const path = require("path");
const server = require('http').Server(app);

//Setup static page handling
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static('public'));
//import api module
var api = require('./api.js');

//cache current and previous card 
app.locals.deck_id = undefined;
app.locals.curr = {};
app.locals.prev = {};
app.locals.matches = { "suit": 0 , "value": 0 };
app.locals.cards = undefined;
app.locals.success = false;

app.get('/', (req, res) => {
    res.render('index');
});

 app.get('/draw', async (req, res) => {
    
    if ( app.locals.deck_id == undefined) {
    const shuffle = await api.shuffle().then((response) => {
    
    app.locals.deck_id = response['deck_id'];
    console.log(response);
    return response;
    });
    const card = await api.draw(app.locals.deck_id).then((response) => {
    console.log(response);
    console.log(response['cards']);
   
    //save card
    app.locals.curr['image'] = response['cards'][0]['image'];
    app.locals.curr['value'] = response['cards'][0]['value'];
    app.locals.curr['suit'] = response['cards'][0]['suit'];
    app.locals.cards = response['remaining'];
    
    res.render('index');
   })
} else {
    api.draw(app.locals.deck_id).then((response) => {
        console.log(response);
        console.log(response['cards']);
        if (response['success'] == true){
            app.locals.success = true;
            if (app.locals.curr['value'] == response['cards'][0]['value']) app.locals.matches['value'] =  app.locals.matches['value'] + 1 ;
            if ( app.locals.curr['suit'] == response['cards'][0]['suit']) app.locals.matches['suit'] =  app.locals.matches['suit'] + 1 ;
       
        //save cards
        app.locals.prev['image'] =  app.locals.curr['image'];
        app.locals.prev['value'] =  app.locals.curr['value'];
        app.locals.prev['suit'] =  app.locals.curr['suit'];
        app.locals.curr['image'] = response['cards'][0]['image'];
        app.locals.curr['value'] = response['cards'][0]['value'];
        app.locals.curr['suit'] = response['cards'][0]['suit'];
        app.locals.cards = response['remaining'];
        } else {
            app.locals.curr = {}
            app.locals.success = false;
           

        }
        
        res.render('index');
       });
}
    
   });
   

function startServer() {
    const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

if (module === require.main) {
    startServer();
}


module.exports = server;