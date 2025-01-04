export const isSeller = (req, res, next) => {
    if(req.user.role !== "seller"){
        return res.status(403).json({message: "Access denied. Sellers Only."});
    }
    next();
}