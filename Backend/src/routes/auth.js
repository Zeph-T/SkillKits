// all the authorisation routes
import * as StudentApi from '../api/controllers/student';

module.exports = (router) => {
    router.get('/',(req,res)=>{
        res.status(200);
        return res.json({status : 'Up and Running'});
    });
    router.post('/studentsignup',StudentApi.signup);
}