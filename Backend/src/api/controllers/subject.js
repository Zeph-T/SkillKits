// all the subject related controllers
import Subject from '../models/subject';
import Student from '../models/student';
import mongoose from 'mongoose';
import { getAllAssignments } from './assignment';
import { getAnnouncements } from './announcements';
import Q from 'q';
export function joinSubject(req,res){
    try{
        Subject.findOne({classCode : req.body.classCode}).then(oSub=>{
            if(oSub){
                Student.findOneAndUpdate({_id : mongoose.Types.ObjectId(req.user._id)},{$push : { activeClasses : oSub._id }},{new : true}).then(oUser=>{
                    oSub.Students.push(mongoose.Types.ObjectId(req.user._id));
                    oSub.save((err,doc)=>{
                        if(err){
                            throw err;
                        }else{
                            return res.status(200).send(doc);
                        }
                    })
                }).catch(err=>{
                    return res.status(400).send({error : err.stack});
                })
            }else{
                throw 'Subject Doesn`t exist';
            }
        }).catch(err=>{
            return res.status(400).send({error : err});
        })
    }catch(err){
        return res.status(400).send({error : err});
    }
}



export function createSubject(req,res){
    try{    
        if(req.body && req.body.name){
            let newSubject  = new Subject;
            newSubject.name = req.body.name;
            newSubject.faculty = [];
            newSubject.faculty.push(mongoose.Types.ObjectId(req.user.id));
            newSubject.save(err=>{
                if(err){
                    return res.status(400).send({error : err});
                }else{
                    return res.status(200).send(newSubject);
                }
            })
        }else{
            return res.status(400).send({error : 'Add Payload Data!'});
        }
    }catch(err){    
        return res.status(400).send({error : err.stack});
    }
}


export function getSubjectData(req,res){
    try{
        let getAllAssignmentsPromise = getAllAssignments(req.param.subjectId);
        let getAllAnnouncementsPromise = getAnnouncements(req.params.subjectId);
        Q.all([getAllAnnouncementsPromise,getAllAssignmentsPromise]).then(data=>{
            return res.status(200).send({
                assignments : data[1],
                announcements : data[0]
            })
        }).catch(err=>{
            return res.status(400).send({error : err});
        })
    }catch(err){
        return res.status(400).send({error: err});
    }
}