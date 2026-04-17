import { Router } from "express";
import { PostController } from "../controllers/PostController.js";

const postController = new PostController();
const router = Router();

router.get("/", (req, res) => postController.list(req, res));
router.post("/", (req, res) => postController.create(req, res));

export const postRoutes = router;
