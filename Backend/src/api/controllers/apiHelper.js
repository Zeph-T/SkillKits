import nodemailer from 'nodemailer';
import { SENDER_EMAIL_ID,SENDER_EMAIL_PASSWORD } from '../../config/env';
import { ConfigAuth } from '../../config/token';
import Q from 'q';
import jwt from 'jsonwebtoken';
import * as EmailValidator from 'email-validator';
import Student from '../models/student';
import Faculty from '../models/faculty';

export const emailContexts  = {
    WELCOME : 'WELCOME'
}


export const emailSubjects = {
    'WELCOME' : 'Welcome to SkillKits!😊'
}


export const emailHTML = {
    'WELCOME' : '<h1>Hey There!<h1> <p>We are glad to have you! Hope you feel comfortable and reach out to Support, incase of any Discrepency </p>'
}

export const TokenTypes = {
    authToken : 'authToken'
}

export function sendEmail(email,context,data={}){
    var deferred = Q.defer();
    var transpoter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : SENDER_EMAIL_ID,
            pass : SENDER_EMAIL_PASSWORD 
        }
    });

    var mailOptions = {
        from  : SENDER_EMAIL_ID,
        to : email,
        subject : emailSubjects[context],
        html : emailHTML[context]
    }
    transpoter.sendMail(mailOptions , function(err,info){
        if(err){
            console.log(err);
            deferred.reject(err.message);
        }else{
            console.log("Email Sent " + info.response);
            deferred.resolve(true);
        }
    })
    return deferred.promise;
}


export const validateUserEmail = (email ,isStudent, checkForExistingUser)=> {
    var deferred = Q.defer();
    if(!EmailValidator.validate(email)){
        deferred.reject('Invalid Email Provided');
    }else{
        if(checkForExistingUser){
            if(isStudent){
                Student.findOne({
                    email : email
                },(err,user)=>{
                    if(err){
                        deferred.reject('Invalid Email Provided');
                    }else{
                        if(user){
                            deferred.reject('Existing User');
                        }else{
                            deferred.resolve(true);
                        }
                    }
                })
            }else{
                Faculty.findOne({
                    email : email
                },(err,user)=>{
                    if(err){
                        deferred.reject('Invalid Email Provided');
                    }else{
                        if(user){
                            deferred.reject('Existing Faculty Member');
                        }else{
                            deferred.resolve(true);
                        }
                    }
                })   
            }
        }else{
            deferred.resolve(true);
        }
    }
    return deferred.promise;
}

export function validateToken(token,tokenType){
    var deferred = Q.defer();
    jwt.verify(token,ConfigAuth.token.secret,function(err,decoded){
        if(!err && decoded && (tokenType && tokenType == decoded.type)){
            deferred.resolve({isValid : true , payload : decoded});
        }else{
            deferred.reject(false);
        }
    })
    return deferred.promise;
}
export function validateUser(req,res,user){
    validateToken(user.authToken , TokenTypes.authToken).then(response=>{
        if(response.isValid){
            res.status(200);
            res.cookie('AccessToken',user.authToken,{
                expires : new Date(Date.now() + 172800000)
            });
            return res.send(user);
        }
    }).catch(function(){
        user.authToken = jwt.sign({
            email :  user.email,
            type:TokenTypes.authToken
        },ConfigAuth.token.secret,{expiresIn : '10 days'});
        user.save(function(err){
            if(err){
                return res.status(400).send({error:err});
            }else{
                res.status(200);
                res.cookie('AccessToken',user.authToken,{
                    expires: new Date(Date.now() + 172800000),
                });
                return res.send(user);
            }
        })
    })
}


export function isAuthenticatedUser(req){
    var deferred = Q.defer();
    this.validateToken(req.cookies.AccessToken,TokenTypes.authToken).then(response=>{
        if(response.isValid){
            req.user = response.payload;
            Student.findOne({email : req.user.email.toLowerCase()}).lean().then(user=>{
                if(!user){
                    deferred.reject(false);
                }else{
                    req.user = user;
                    deferred.resolve(true);
                }
            }).catch(err=>{
                deferred.reject(false);
            })
        }else{
            deferred.resolve(false);
        }
    }).catch(err=>{
        deferred.resolve(false);
    })
    return deferred.promise;
}