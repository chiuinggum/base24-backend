import express from 'express';
import bodyParser from 'body-parser';
import {
    userSignUp,
    userSignIn
} from '../controllers/UsersController.js';

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

// sign up
usersRouter.post('/signup', userSignUp);
// sign in
usersRouter.post('/signin', userSignIn);

export default usersRouter;