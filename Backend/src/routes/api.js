// all the api routes


module.exports = (router) => {
    router.get('/',(req,res)=>{
        res.status(200);
        return res.json({status : 'Up and Running'});
    });
}