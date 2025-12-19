const expect = require("chai").expect;
const request = require("request");


const baseUrl = "http://localhost:3000/addTwoNumbers";

describe("Calculator API Tests", function() {

    
    it("should return status 200 and result 15 for inputs 10 and 5", function(done) {
        request.get(`${baseUrl}?n1=10&n2=5`, function(error, response, body) {
            const responseBody = JSON.parse(body);
            expect(response.statusCode).to.equal(200);
            expect(responseBody.data).to.equal(15);
            expect(responseBody.message).to.equal("Success");
            done();
        });
    });

    
    it("should return status 200 and correct sum for negative numbers", function(done) {
        request.get(`${baseUrl}?n1=-10&n2=-5`, function(error, response, body) {
            const responseBody = JSON.parse(body);
            expect(response.statusCode).to.equal(200);
            expect(responseBody.data).to.equal(-15);
            done();
        });
    });

    
    it("should return status 200 and handle zeros correctly", function(done) {
        request.get(`${baseUrl}?n1=0&n2=0`, function(error, response, body) {
            const responseBody = JSON.parse(body);
            expect(response.statusCode).to.equal(200);
            expect(responseBody.data).to.equal(0);
            done();
        });
    });

    
    it("should return status 400 when inputs are strings", function(done) {
        request.get(`${baseUrl}?n1=hello&n2=world`, function(error, response, body) {
            const responseBody = JSON.parse(body);
            expect(response.statusCode).to.equal(400);
            expect(responseBody.message).to.include("Invalid Input");
            done();
        });
    });

    
    it("should return status 400 when parameters are missing", function(done) {
        request.get(baseUrl, function(error, response, body) {
            const responseBody = JSON.parse(body);
            expect(response.statusCode).to.equal(400);
            expect(responseBody.data).to.be.null;
            done();
        });
    });

    
    it("should return status 400 when one parameter is invalid", function(done) {
        request.get(`${baseUrl}?n1=50&n2=xyz`, function(error, response, body) {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });

    
    it("should return a JSON object with specific keys (statusCode, data, message)", function(done) {
        request.get(`${baseUrl}?n1=1&n2=1`, function(error, response, body) {
            const responseBody = JSON.parse(body);
            expect(responseBody).to.have.property("statusCode");
            expect(responseBody).to.have.property("data");
            expect(responseBody).to.have.property("message");
            done();
        });
    });

});