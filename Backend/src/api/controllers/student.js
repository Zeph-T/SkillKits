// all the student related controllers
import Student from '../models/student';
import { emailContexts,validateUserEmail,sendEmail } from "./apiHelper";
import fetch from 'node-fetch';

export function signup(req,res){
    try{
        let userInfo = req.body;
        userInfo.email = userInfo.email.toLowerCase();
        if(!userInfo.email || !userInfo.password || !userInfo.name || userInfo.password.length<8){
            if(userInfo.password.length < 8){
                res.status(422);
                return res.send({error:"Password Too Short"});
            }else{
                res.status(400);
                return res.send({error :"Required Fields Error"});
            }
        }
        fetch(`https://open.kickbox.com/v1/disposable/${userInfo.email}`).then(function (response) {
                return response.json();
            }).then(function(isDisposedData){
                if(!isDisposedData.disposable){
                    validateUserEmail(userInfo.email,true,true).then(isValid=>{
                        if(isValid){
                            let newStudent = new Student;
                            newStudent.name = userInfo.name;
                            newStudent.email = userInfo.email;
                            newStudent.password = newStudent.generateHash(userInfo.email);
                            newStudent.save(function(err){
                                if(err){
                                    return res.status(400).send({error:err.stack});
                                }else{
                                    sendEmail(userInfo.email,emailContexts.WELCOME).then((isValid)=>{
                                        res.sendStatus(200).send({message : 'User Created!'});
                                    }).catch(err=>{
                                        return res.status(400).send(err);
                                    })
                                }
                            })
                        }
                    }).catch(err=>{
                        return res.status(400).send({error : err.stack});
                    })
                }else{
                    return res.status(500).send({error : 'Error Saving the info!'});
                }
            }).catch(err=>{
                return res.status(400).send(err.stack);
            })
    }catch(err){
        return res.status(400).send(err.stack);
    }
}