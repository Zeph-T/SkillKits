// all the assignment related controllers
import mongoose from 'mongoose';
import Q from 'q';
import AssignmentPost from '../models/assignmentPost';

export function getAllAssignments(subjectId){
    let deferred = Q.defer();
    AssignmentPost.find({subjectId : mongoose.Types.ObjectId(subjectId)}).sort({_id : -1}).then(oAsg=>{
        deferred.resolve(oAsg);
    }).catch(err=>{
        deferred.reject(err);
    })
    return deferred.promise;
}


export function addAssignment(req,res){
    try{
        if(req.body && req.body.name && req.body.deadline && req.body.content && req.body.subjectId){
            newAssignment = new AssignmentPost;
            newAssignment.name = req.body.name;
            newAssignment.deadline = new Date(req.body.deadline);
            newAssignment.content = req.body.content;
            newAssignment.subjectId = mongoose.Types.ObjectId(req.body.subjectId);
            newAssignment.save((err,doc)=>{
                if(err){
                    throw err;
                }else{
                    return res.status(200).send(newAssignment);
                }
            })
        }else{
            throw "Missing Fields";
        }
    }catch(err){
        return res.status(400).send({error : err});
    }
}