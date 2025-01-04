import express from 'express'
import {verifyToken } from '../Controllers/authController.js';
import { protectRoute } from '../Middlewares/auth.js';

const authRouter = express.Router();

authRouter.post('/verify-token', verifyToken);

authRouter.get("/validate-token", protectRoute, (req, res) => {
    res.status(200).send({user: req.user});
});


export default authRouter;