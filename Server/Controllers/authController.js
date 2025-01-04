import  jwt from "jsonwebtoken";
import 'dotenv/config';
import userModel from "../Models/userModel.js";


export const verifyToken = async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        const user = await userModel.findOneAndUpdate(
            { _id: decoded.userId },
            { isEmailVerified: true }
          );

            if(!user) return res.status(404).send({message: "User not found"});

            res.status(200).send({message: "Email verified successfully"});

    } catch (error) {
        res.status(500).send({error: error});
    }
}

export const validateToken = async (req, res) => {
    const token = req.cookies.token;

    if (!token)
        return res
          .status(401)
          .send({ message: "No token found. Cannot Authorize" });
    
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        res.status(200).send({ message: "User is authenticated" });
      }
      catch(error){
        res.status(500).send({ message: "error", error });
      }
}