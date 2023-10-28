import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
const secretekey = process.env.KEY;

const authenticate = async(req,res, next) => {
    try{
        const token = req.cookies.Amazonweb;
        const verifyToken = jwt.verify(token, secretekey);
        console.log(verifyToken);

        const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});
        console.log(rootUser);

        if(!rootUser){
            throw new Error("User not found");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    }catch(error){
        res.status(401).send("Unauthorized: No token found");
        console.log(error);
    }
}

export default authenticate;