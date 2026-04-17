import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Post } from "../entity/Post";
import type { Request, Response } from "express";

export class PostController {
  private postRepository = AppDataSource.getRepository(Post);
  private userRepository = AppDataSource.getRepository(User);

  async list(req: Request, res: Response) {
    try {
      const posts = await this.postRepository.find({ relations: ["user"] });
      return res.json(posts);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: "ocorreu um erro inesperado ao listar os usuarios" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title, content, userId } = req.body;
      if (isNaN(userId)) {
        res.status(400).json({ message: "id do usuario" });
      }
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        return res.status(404).json({ message: "usuario não encontrado" });
      }
      const newPost = this.postRepository.create({ title, content, user });
      await this.postRepository.save(newPost);
      return res.status(201).json(newPost);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: "ocorreu um erro inesperado ao criar o usuario" });
    }
  }
}
