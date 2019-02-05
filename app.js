var express = require('express')
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var jsonpatch = require('jsonpatch')
var _ = require('lodash')
var fs = require('fs')
var request = require('request')
var sharp = require('sharp')

var app = express();

module.exports = app
app.use(bodyParser.json())

//login api 
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

//jsonpatch api
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

//thumbnail api 
app.post('/task/thumbnail',verifyToken, (req,res)=>{
    
    if(!_.isEmpty(req.body)){
        url=req.body.URL
        filename = _.last(url.split("/") )
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
              res.sendStatus(403);
            } else {
                if (url){
                    request(url).pipe(fs.createWriteStream(filename)).on('close',()=>{
            
                        sharp(filename)
                        .resize(50, 50)
                        .toFile(filename+'resize.png', (err, info) => {
                            if (err){
                                res.json({
                                    message:"image cannot be resized"
                                });
        
                            }
                            else{
                                var img = fs.readFileSync(filename+'resize.png');
                                res.writeHead(200, {'Content-Type': 'image/png' });
                                res.end(img, 'binary');
                            }
                        } );
                    
                    
                    
        
                } )
            
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

    //token verification middleware
    function verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } 
        else {
            res.sendStatus(403);
        }
  
  }



app.listen(5000, ()=>console.log("started"));