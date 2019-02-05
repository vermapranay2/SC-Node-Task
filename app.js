var express = require('express');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
var jsonpatch = require('jsonpatch')
var _ = require('lodash')

var app = express();

app.use(bodyParser.json())

app.post('/task/login', (req, res) => {
    // Mock user
    user={}
    if(!_.isEmpty(req.body)){
        
        user.id = req.body.id
        user.username = req.body.username
        user.password = req.body.password
        jwt.sign({user}, 'secretkey', (err, token) => {
            if (user.username && user.password){
                res.json({ token });
        
            }
            else{
                res.json({
                    message: 'A field is missing'
                  });
            }
          
        });

    }
    else{
        res.json({
            message:"Body not provided"
        });
    }
    
});

app.post('/task/patch',verifyToken,  (req, res) => {
    
    if(!_.isEmpty(req.body)){
        json = req.body.json
        patch = req.body.patch
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
              res.sendStatus(403);
            } else {
                if (json && patch){
                    res.json(jsonpatch.apply_patch(json, patch));
            
                }
                else{
                    res.json({
                        message: 'A field is missing'
                      });
                }
            }
        });

    }
    else{
        res.json({
            message:"Body not provided"
        });
    }
    
    });

  function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }



app.listen(5000, ()=>console.log("started"));