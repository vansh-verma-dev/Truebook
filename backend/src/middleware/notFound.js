const notFoundMiddleware  = (req , res , next)=>{
    res.status(400).json({
        success: false , 
        message :  `Routes Not Found${req.originalUrl}`
    })
}

module.exports = notFoundMiddleware