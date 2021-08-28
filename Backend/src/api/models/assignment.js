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
        type:String,
        required : true
    },
    subjectId : {
        type: mongoose.Types.ObjectId,
        ref : 'Subject'
    },
    submittedAt : {
        type:Date,
        default  : Date.now
    }
})

export default mongoose.model('Assignment',AssignmentSchema);