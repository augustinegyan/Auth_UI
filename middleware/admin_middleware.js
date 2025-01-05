
const isAdminuser = (req,res,next)=>{
    if(req.userInfo.role !== 'admin'){
        return res.status(403).json({
            status: false,
            message: 'Access denied : Admin only'
        });
    }
    next();
}
module.exports = isAdminuser;