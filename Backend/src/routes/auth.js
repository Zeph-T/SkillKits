// all the authorisation routes
import * as StudentApi from '../api/controllers/student';

module.exports = (router) => {
    router.get('/',(req,res)=>{
        res.status(200);
        return res.json({status : 'Up and Running'});
    });
    router.post('/studentsignup',StudentApi.signup);
    router.post('/studentlogin',StudentApi.login);
    router.get('/logout',(req,res)=>{
        res.cookie('AccessToken','',{
            expires : new Date(Date.now())
        });
        res.status(200);
        res.send({});
    });
}