var chai = require("chai")
var should = chai.should();
var chaiHttp = require('chai-http');


var app = require('../app');
chai.use(chaiHttp);


describe('Test for 3 endpoints', ()=> {
    it('returns token', (done)=> {
        var user={
            "id": 1,
            "username" : "chjadsdncjd",
            "password" : "ndsnjkc"
    
        }
        chai.request(app)
            .post('/task/login')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('token');
                  console.log(res.body.token)
                  
              done();
            });
    });

    it('returns patched json', (done)=> {
        var body={
            "json" : {
              "baz": "qux",
              "foo": "bar"
            },
            "patch" : [
              { "op": "replace", "path": "/baz", "value": "boo" },
              { "op": "add", "path": "/hello", "value": ["world"] },
              { "op": "remove", "path": "/foo" }
            ]
            
            
            }
        result={
            "baz": "boo",
            "hello": [
                "world"
            ]
        }
        chai.request(app)
            .post('/task/patch')
            .set('authorization', "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImNoamFkc2RuY2pkIiwicGFzc3dvcmQiOiJuZHNuamtjIn0sImlhdCI6MTU0OTMzNDA2M30.4P05g47ihBorERO_2w59hGgpz5Vr0rGqxEQ3upQo1y0")
            .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql(result);
                console.log(res.body)
                  
              done();
            });
    });

    

    it('returns resized image ', (done)=> {
        var body={}
        body.URL = "https://www.google.com/images/srpr/logo3w.png"
        

        chai.request(app)
            .post('/task/thumbnail')
            .set('authorization', "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImNoamFkc2RuY2pkIiwicGFzc3dvcmQiOiJuZHNuamtjIn0sImlhdCI6MTU0OTMzNDA2M30.4P05g47ihBorERO_2w59hGgpz5Vr0rGqxEQ3upQo1y0")
            .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                console.log(res.body)
                  
              done();
            });
    });
});