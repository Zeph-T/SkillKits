import mongoose from 'mongoose';


const AnnouncementSchema = mongoose.Schema({
    name : {
        type:String
    },
    postedOn  :{
        type:Date,
        default : Date.now
    },
    content : {
        type:String
    },
    subjectId : {
        type:mongoose.Types.ObjectId,
        ref : 'Subject'
    }
})

export default mongoose.model('Announcement',AnnouncementSchema);