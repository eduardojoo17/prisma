import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

const userController = new UserController();
const router = Router();

router.post("/", (req, res) => userController.create(req, res));
router.get("/", (req, res) => userController.list(req, res));
router.delete("/:id", (req, res) => userController.delete(req, res));
router.patch("/:id", (req, res) => userController.update(req, res));
export const userRoutes = router;
