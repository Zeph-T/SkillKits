// all the api routes
import * as apiHelper from '../api/controllers/apiHelper';

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
        return res.send({message : "Working!"} );
    });
}