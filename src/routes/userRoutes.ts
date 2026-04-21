import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

const userController = new UserController();
const router = Router();

router.post("/", userController.create);
router.get("/", userController.list);
router.delete("/:id", userController.delete);
router.patch("/:id", userController.update);
router.get("/active", userController.listActive);
router.get("/:id", userController.listbyid);
router.patch("/:id/toggle", userController.toggleActive);

export const userRoutes = router;
