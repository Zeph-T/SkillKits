// all the api routes
import * as apiHelper from '../api/controllers/apiHelper';
import * as subjectApi from '../api/controllers/subject';
import * as announcementApi from '../api/controllers/announcements';
import * as assignmentApi from '../api/controllers/assignment';
import * as scheduleApi from '../api/controllers/schedule';
import * as studentApi from '../api/controllers/student';
import * as facultyApi from '../api/controllers/faculty';

module.exports = (router) => {
    router.use(function(req,res,next){
        req.cookies = {
            AccessToken : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhdWwuemVwaEBnbWFpbC5jb20iLCJpc0ZhY3VsdHkiOnRydWUsInR5cGUiOiJhdXRoVG9rZW4iLCJpYXQiOjE2MzAyNjkwMTIsImV4cCI6MTYzMTEzMzAxMn0.71ECzAI4yr4pc4Zp-ohm45hqwVby1PW-gtEiwJqb5vA'
        }
        apiHelper.isAuthenticatedUser(req).then(isValid=>{
            if(isValid){
                next();
            }else{
                res.status(400);
                return res.send({error:'Auth Token Expired'});
            }
        }).catch(err=>{
            res.status(400);
            return res.send({error : err});
        })
    })
    router.get('/',(req,res)=>{
        res.status(200);
        // console.log("In / route",req.user);
        return res.send({message : "Working!"} );
    });
    router.get('/checkForLoggedInUser',apiHelper.checkForLoggedInUser);
    router.post('/joinSubject',subjectApi.joinSubject);
    router.post('/createSubject',apiHelper.isAdmin , subjectApi.createSubject);
    router.post('/postAnnouncement',apiHelper.isAdmin,announcementApi.AddAnouncement);
    router.post('/postTestOrAssignment',apiHelper.isAdmin,assignmentApi.addAssignment);
    router.get('/getSubjectData/:subjectId',subjectApi.getSubjectData);
    router.post('/scheduleClass',apiHelper.isAdmin , scheduleApi.scheduleClass);
    router.get('/getSchedule',scheduleApi.getSchedule);
    router.get('/getFacultySchedule',apiHelper.isAdmin ,scheduleApi.getFacultySchedule);
    router.post('/submitAssignment',assignmentApi.submitAssignment);
    router.get('/getStudentSubjects',studentApi.getAllSubjects);
    router.get('/getFacultySubjects',apiHelper.isAdmin ,facultyApi.getAllSubjects);
}
