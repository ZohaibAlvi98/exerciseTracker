'use strict';
var compose = require('composable-middleware');

var SessionModel = require("../api/userSession/userSession.model")
var UserModel = require("../api/user/user.model")

function isAuthenticated() {
    return compose()
        // Attach user to request
        .use(function(req, res, next) {
            SessionModel.findById(req.query.token, (err,session)=>{
                if(session!=null&&session.isDeleted==false){
                    UserModel.findById(session.user, (err, user)=>{

                        req.user = user
                        next();
                    })
                }else{
                    res.send({
                        success: false,
                        message: "login"
                    })
                }
            })
        });
}
function isAdmin() {
    return compose()
        // Attach user to request
        .use(function(req, res, next) {
            SessionModel.findById(req.query.token, (err, sessions) => {
                if (err) {
                  //console.log("err", err);
                }
                //console.log('Session found', sessions);
                if (sessions != undefined) {
                  if (!sessions.isDeleted) {
                
                    UserModel.findOne({
                      _id: sessions.user
                    }, (err, user) => {
                      //console.log('User', user[0])
                      if (user.role=='admin') {
                        req.user = user;
                        next();
                      } else {
                        res.status(403).send({
                          success: false,
                          message: "Account not approved"
                        });
                      }
                    });
                  } else {
                    res.status(404).send({
                      success: false,
                      message: "Session Deleted"
                    });
                  }
                }else{
                  res.status(404).send({
                    success: false,
                    message: "undefined"
                  })
                }
            });
        });
  }

exports.isAuthenticated = isAuthenticated;
exports.isAdmin= isAdmin;