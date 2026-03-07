const authMiddleware = async (req,res, next) => {
    console.log("middleware")
    next();
}