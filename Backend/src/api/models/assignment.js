import mongoose from 'mongoose';


const AssignmentSchema = mongoose.Schema({
    assignmentPostId : {
        type:mongoose.Types.ObjectId,
        ref :'AssignmentPost'
    },
    submittedBy : {
        type : mongoose.Types.ObjectId,
        ref : 'Student'
    },
    lateSubmission : {
        type:Boolean
    },
    submissionLink  : {
        type:String
    },
    classCode : {
        type: String
    },
    submittedAt : {
        type:Date,
        default  : Date.now
    },
    facultyId : {
        type:mongoose.Types.ObjectId,
        ref:'Faculty'
    }
})

export default mongoose.model('Assignment',AssignmentSchema);