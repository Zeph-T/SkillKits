import mongoose from 'mongoose';
import randtoken from 'rand-token';



const SubjectSchema = mongoose.Schema({
    name : {
        type:String,
        required : true
    },
    classCode : {
        type:String,
        default : function(){
            return randtoken.generate(5)
        },
        unique : true
    },
    faculty : [{
        type:mongoose.Types.ObjectId,
        ref: 'Faculty'
    }],
    Students : [{
        type:mongoose.Types.ObjectId,
        ref: 'Student'
    }]
})


export default mongoose.model('Subject',SubjectSchema);