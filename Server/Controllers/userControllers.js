import mongoose from "mongoose";
import userModel from "../Models/userModel.js";
// import bcrypt from 'bcrypt';
import { sendVerificationEmail } from "../utils/verification.js";
import jwt from 'jsonwebtoken';
import { generateOtp } from '../utils/generateOtp.js';
import { sendMail } from "../utils/sendMail.js";


// export const register = async (req, res) => {
//     const {name, email, username, phone} = req.body;
//     try {
//         const existingUsername = await userModel.findOne({username});
        
//         if(existingUsername) return res.status(400).send({message: `Username ${username} exists`});

//         const existingEmail = await userModel.findOne({email});
        
//         if(existingEmail) return res.status(400).send({message: "Given Email address exists. Please try to register with another email"});

//         const password = await bcrypt.hash(req.body.password, 10);

//         const newUser = new userModel({
//             name,
//             email,
//             username,
//             password,
//             phone
//         });

//         await newUser.save();

//         await sendVerificationEmail(newUser._id, newUser.email);

//         res.status(201).send({message:"User registered successfully"});
//     } catch (error) {
//         res.status(500).send({ message: "Error registering user", error: error.message });
//     }
// }

export const registerSeller = async (req, res) => {
    const { name, username, email, phone } = req.body;
  
    try {
      const existingUsername = await userModel.findOne({ username });
      if (existingUsername) {
        return res.status(400).send({ message: `Username ${username} exists` });
      }
  
     
      const existingEmail = await userModel.findOne({ email });

  
      if (existingEmail && existingEmail.role === "seller") {
        return res.status(400).send({ message: `You are already a seller` });
      }
  
      if (existingEmail) {
        await userModel.findOneAndUpdate({ email }, { role: "seller" });
        await userModel.findOneAndUpdate({ email }, {username: username});

        return res.status(201).send({ message: `Your status is now elevated to a seller` });
      } else {
        
        const password = await bcrypt.hash(req.body.password, 10);
  
        const newUser = new userModel({
          name,
          username,
          email,
          phone,
          password,
          role: "seller",
        });
  
        
        await newUser.save();
  
       
        await sendVerificationEmail(newUser._id, newUser.email);
  
        return res.status(201).send({ message: "Seller registered" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error registering user", error: error.message });
    }
  };
  export const register = async (req, res) => {
    const { name, email, username, phone, password } = req.body;

    try {
        const existingUsername = await userModel.findOne({ username });
        if (existingUsername) return res.status(400).send({ message: `Username ${username} exists` });

        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) return res.status(400).send({ message: "Given Email address exists. Please try to register with another email" });

        const newUser = new userModel({
            name,
            email,
            username,
            password, // Store password directly
            phone,
        });

        await newUser.save();
        await sendVerificationEmail(newUser._id, newUser.email);

        res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error registering user", error: error.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(401).send({ message: "Incorrect credentials" });
        }

        if (!user.isEmailVerified) {
            return res.status(403).send({ message: "Please verify your email before logging in" });
        }

        // Direct password comparison
        if (password !== user.password) {
            return res.status(401).send({ message: "Incorrect credentials" });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        const loggedInUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            username: user.username,
        };

        return res.status(200).send({ message: "User has logged in successfully", loggedInUser });
    } catch (error) {
        res.status(500).send({ message: "Error logging in user", error: error.message });
    }
};

  

// export const login = async (req, res) => {
//     const {username, password} = req.body;

//     try {
//         const user = await userModel.findOne({username});

//         if(!user){
//             return res.status(401).send({message: "Incorrect credentials"});
//         }
        
//         if(!user.isEmailVerified){
//             return res.status(403).send({message: "please verify your email before logging in"});
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);

//         if(!passwordMatch){
//             return res.status(401).send({message: "Incorrect credentials"});
//         }

//         const token = jwt.sign(
//         {
//            userId: user._id,
//            username: user.username,
//         },
//         process.env.JWT_SECRET,
//         {
//             expiresIn: "24h",
//         }
//      );

//        res.cookie("token", token, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "none",
//         maxAge: 24 * 60 * 60 * 1000,
//        });

//        const loggedInUser = {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         gender: user.gender,
//         username: user.username,
//       };

//     return res.status(200).send({message: "User has logged in successfully", loggedInUser});


//     } catch (error) {
//         res.status(500).send({message: "Error logging in user", error: error.message});
//     }
// }

export const logout = async (req, res) => {
    res.clearCookie("token",
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Match the secure flag
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Match sameSite flag
      });
    // res.clearCookie("token");
    res.status(200).send({message: "User logged out successfully"});
}

export const profile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select("-password");

        if(!user){
            return res.status(404).send({message: "user not found"});
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            phone: user.phone,
            gender: user.gender,
            createdAt: user.createdAt,
            role: user.role,
        })
    } catch (error) {
        res.status(500).send({message: "Server error while fetching profile"});
    }
}

export const editProfile = async (req, res) => {
    const { name, email, role, phone, username } = req.body;
  
    try {
      await userModel.findByIdAndUpdate(req.user._id, {
        name,
        email,
        role,
        phone,
        username,
      });
  
      res.status(200).send({ message: "User Updated successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Error updating product", error });
    }
  };

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
       if(!id){
           return res.status(400).send({message: "You must specify a User ID"})
       }
   
       if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(404).send({message: "The user ID is not in proper format"});
       }
   
       const deletedUser = await userModel.findByIdAndDelete(id);
   
       if (!deletedUser)
           return response
             .status(404)
             .send({ message: "No user found with the given ID" });
     
         res.send({ message: "User with the given ID deleted" });
    } catch (error) {
         res.status(500).send({message: "Error deleting user", error});
    }
}

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId= req.user._id;

    const user = await userModel.findById(userId);

    if(user.wishlist.includes(productId)){
      return res.status(400).json({message: "product already in wishlist"});
    }

    await userModel.findByIdAndUpdate(userId, {
      $push: {wishlist: productId},
    });

    res.status(200).json({message: "Added to wishlist successfully"});
  } catch (error) {
    res.status(500).json({message: "Error adding to wishlist"});
  }
}

export const removeFromWishlist = async (req, res) => {
  try {
      const { id } = req.params; 
      const userId = req.user._id;          

      const user = await userModel.findById(userId);

      
      if (!user.wishlist.includes(id)) {
          return res.status(400).send({ message: "Product not found in wishlist" });
      }

      
      await userModel.findByIdAndUpdate(userId, {
          $pull: { wishlist: id },
      });

      res.status(200).send({ message: "Removed from wishlist successfully" });
  } catch (error) {
      res.status(500).send({ message: "Error in removing from wishlist" });
  }
};


export async function forgotPassword(req, res) {
  const { username } = req.body;

  if (!username) {
      return res.status(400).json({ error: 'username is required' });
  }
  const user = await userModel.findOne({username: username});
  if(!user){
      return res.status(404).json({error: 'User is not found'});
  }

  try {
      const subject = 'Reset Password';
      const body = generateOtp();
      const otp = body;
      await sendMail(process.env.USER_EMAIL, process.env.USER_PASSWORD, user.email, subject, body);
      await updateOtp(user._id, otp);
      res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send password reset email' });
  }
}

export async function verifyOtp(req, res){
  const {username, otp} = req.body;
  const user = await userModel.findOne({username: username});
  if(!user){
      return res.status(401).json({message: "User not found"});
  }
  if(user.otp === otp && Date.now() < user.validFor){
      user.isOtpVerified= true;
      user.save();
      res.status(200).json({message: 'OTP is verified successfully'});
  }
  else{
      res.status(401).json({message: 'Invalid Otp'});
  }
}


export async function changePassword(req, res){
  const {username, password} = req.body;
  
  const user = await userModel.findOne({username: username});
  if(!user){
      res.status(401).json({message: "User not found"});
  }

  if(!user.isOtpVerified){
    return res.status(400).json({message: "OTP verifucation is required"});
  }

  const hashPassword = await bcrypt.hash(password, 10);
  await userModel.findByIdAndUpdate(
      user._id,
      {password: hashPassword},
      {new: true, upsert: false}
 );
 res.status(200).json({message: 'Password updated successfully'});
}

async function updateOtp(userId, otp){
  try {
      const validFor = Date.now() + 5 * 60 * 1000;
      const updatedUser = await userModel.findByIdAndUpdate(
           userId,
           {otp, validFor, isOtpVerified: false},
           {new: true, upsert: false}
      );

      if(!updatedUser){
          res.status(401).json({message: "User not found"});
          return null;
          
      }
      return updatedUser;
  } catch (error) {
      console.error('Error updating OTP: ', error);
      throw error;
  }
}

