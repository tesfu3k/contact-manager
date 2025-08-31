import { Router } from "express";
import {
  signUp,
  signIn,
  signOut,
  currentUser,
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/protect.middleware.js";
const route = new Router();

/*
  - POST /sign-up to sign up users
  - POST /sign-in to login
  - GET /sign-out to logout users - auth
  - GET /me to get currect auth user - auth
*/

route.post("/sign-up", signUp);
route.post("/sign-in", signIn);
route.get("/sign-out", signOut);
route.get("/me", protectRoute, currentUser);

export default route;
