import nodemailer from 'nodemailer';
import { SENDER_EMAIL_ID,SENDER_EMAIL_PASSWORD } from '../../config/env';
import Q from 'q';
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