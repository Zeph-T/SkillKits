// all the api routes
import * as apiHelper from '../api/controllers/apiHelper';
import * as subjectApi from '../api/controllers/subject';
import * as announcementApi from '../api/controllers/announcements';
import * as assignmentApi from '../api/controllers/assignment';


module.exports = (router) => {
    router.use(function(req,res,next){
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
    router.post('/joinSubject',subjectApi.joinSubject);
    router.post('/createSubject',apiHelper.isAdmin , subjectApi.createSubject);
    router.post('/postAnnouncement',apiHelper.isAdmin,announcementApi.AddAnouncement);
    router.post('/postTestOrAssignment',apiHelper.isAdmin,assignmentApi.addAssignment);
    router.get('/getSubjectData/:subjectId',subjectApi.getSubjectData);

}
