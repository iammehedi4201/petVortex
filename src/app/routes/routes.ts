import express from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { petRoutes } from "../modules/pet/pet.routes";
import { adoptionRequestRoutes } from "../modules/adoptionRequest/adoptionRequest.routes";
import { userRoutes } from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "",
    route: authRoutes,
  },
  {
    path: "",
    route: userRoutes,
  },
  {
    path: "/pets",
    route: petRoutes,
  },
  {
    path: "/adoption-request",
    route: adoptionRequestRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
