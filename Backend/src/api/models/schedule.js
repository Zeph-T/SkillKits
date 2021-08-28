import mongoose from 'mongoose';

const ScheduleSchema = mongoose.Schema({
    subjectId : {
        type:mongoose.Types.ObjectId,
        ref : 'Subject'
    },
    scheduledAt : {
        type:Date
    }
});
 

export default mongoose.model('Schedule',ScheduleSchema);