// all the assignment related controllers
import mongoose from 'mongoose';
import Q from 'q';
import AssignmentPost from '../models/assignmentPost';
import Assignment from '../models/assignment';
import Student from '../models/student';
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
            let newAssignment = new AssignmentPost;
            newAssignment.name = req.body.name;
            newAssignment.deadline = new Date();
            // newAssignment.deadline = new Date(req.body.deadline);
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

export function submitAssignment(req,res){
    try{
        if(req.body && req.body.submissionLink && req.body.assignmentPostId){
            let submissionPostPromise = AssignmentPost.findOne({_id : mongoose.Types.ObjectId(req.body.assignmentPostId)});
            let newSubmission = new Assignment;
            newSubmission.submissionLink = submissionLink;
            newSubmission.assignmentPostId = mongoose.Types.ObjectId(req.body.assignmentPostId);
            Q.all([submissionPostPromise]).then(data=>{
                newSubmission.lateSubmission = data[0].deadline > Date.now();
                newSubmission.subjectId = data[0].subjectId;
                newSubmission.submittedBy = mongoose.Types.ObjectId(req.user._id);
                newSubmission.save((err,doc)=>{
                    if(err){
                        return res.status(400).send({error : err});
                    }else{
                        Student.findByIdAndUpdate(mongoose.Types.ObjectId(req.user._id),{push : {CompletedAssignments : req.body.assignmentPostId}},(err,resp)=>{
                            if(err){
                                return res.status(400).send({error : err});
                            }else{
                                return res.status(200).send(doc);                                
                            }
                        })
                    }
                })
            }).catch(err=>{
                return res.status(400).send({error : err});
            })
        }else{
            throw 'Missing Fields'
        } 
    }catch(err){
        return res.status(400).send({error : err});
    }
}



