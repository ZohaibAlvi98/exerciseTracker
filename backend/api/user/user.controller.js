'use strict';

const fs = require('fs');
const path = require('path');
var crypto = require('crypto');


const UserService = require('./user.service');
const UserModel = require('./user.model'); 
// const UtilService = require('../utility/util');
// const htmlTemplateService = require('../utility/htmltemplates');
const UserSession = require('../userSession/userSession.model'); 
const _ = require('lodash');


function handleError(res,error,code){
    res.status(code).send({success: false, message:error.message});
}

exports.create = function(req,res){
    try{
        console.log(req.body)
        // req.body.role = "user";
        console.log(req.body)
        UserService.create(req.body)
        .then( function (user){
            // sending access token
            res.send({
                success: true,
                user,
                message: "You have successfully signed up."
            }); 
        })
        // .catch(function(error){
        //     //console.log('error')
        //     //console.log(error)
        //     if(error.errors && error.errors.email && error.errors.email.message == 'The specified email address is already in use.'){
        //         res.send({message: 'The specified email address is already in use.', success: false})
        //     }else if(error.errors && error.errors.email && error.errors.email.message == "Path `email` is required."){
        //         res.send({message: 'Email is required', success: false})
        //     }else if(error.message == 'Invalid password'){
        //         res.send({message: 'Invalid password', success: false})
        //     }
        //     if(error.code == 11000)res.status(422).send(['This email address is already be in use'])
        //     else{
        //         handleError(res,error,500);
        //     }
           
            
        // })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    } 
}

exports.update = async function(req,res){
  
    try{
        userService.findByIdAndUpdate(req.user._id, req.body, function(err, updateUser){
            if(err){
                res.send({
                    success: false,
                    message: err
                })  
            }
            else
            {
                
                res.send({success:true,updateUser})
             }
            
        })
    }
    catch(e){
        res.send({
            success: false,
            message: e.message
        })
     }  
}

exports.login = async function(req, res){
    try{
      
        let {email, password} = req.body
        await UserModel.findOne({
            email
        }, (err,user)=>{
            if(err){
                res.send({
                    success: false,
                    message: err
                })    
            }
            if(user!=null){
                
                if(user.authenticate(password)){
                    UserSession.create({user: user._id}, (err, raw)=>{ 
                        
                        res.send({success: true, jwt: raw._id, user})
                    })
                }else{
                    res.send({
                        success: false,
                        message: "Incorrect password."
                    })
                }
            }else{
                console.log()
                res.send({
                    success: false,
                    message: "User not found"
                })
            }
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    } 
}

exports.getUser = async(req,res)=>{
    try{
        console.log('heere')
    let user= await UserModel.find({})
    console.log(user)
    res.send({
        success: true,
        user: user,
        message: "user"
    })
    }catch(e){
        res.send({
            success: false,
            message: "login"
        })
    }
}