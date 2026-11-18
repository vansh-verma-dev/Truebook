const errorMiddleware = (err , req , res , next)=>{

    const errorStatus = err.statusCode || 500
    res.status(errorStatus).json({
        success : false, 
    message :   err.message || "Internal server Error"  })
}
module.exports = errorMiddleware;