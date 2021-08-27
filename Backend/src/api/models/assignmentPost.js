import mongoose from 'mongoose';

const AssignmentPostSchema = mongoose.Schema({
    name : { 
        type:String,
    },
    submissionTime : {
        type:Date
    },
    submissionDate : {
        type:Date
    },
    postedOn  : {
        type : Date,
        default : Date.now
    },
    content : {
        type:String
    },
    classCode : {
        type:String
    }
})


export default mongoose.model('AssignmentPost',AssignmentPostSchema);