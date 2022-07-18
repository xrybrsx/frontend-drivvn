var assert = require('assert');
var request = require('request');

const { expect } = require('chai');
var httpMocks = require('node-mocks-http');
var app = require('../app.js');
const { default: axios } = require('axios');
var url = "http://localhost:8080";

    describe("Main page working", function() {
  
     
  
      it("returns status 200", function() {
        request(url, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
       
        }); });
     
      
      it('should draw cards successfully', () => {
        request(url+"/draw", function(error, response, body) {
            console.log(response);
            expect(response.statusCode).to.equal(200);
            
          });
    });
});
    