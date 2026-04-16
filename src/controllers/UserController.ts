import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import type { Request, Response } from "express";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async create(req: Request, res: Response) {
    try {
      const { firstName, lastName } = req.body;
      const newUser = this.userRepository.create({ firstName, lastName });
      await this.userRepository.save(newUser);
      return res.status(201).json(newUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: "ocorreu um erro inesperado ao criar o usuario" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { firstName, lastName } = req.body;
      if (isNaN(id)) {
        res.status(400).json({ message: "id invalido" });
      }
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        res.status(404).json({ message: "usuario não encontrado" });
      }
      user.firstName = firstName ?? user.firstName;
      user.lastName = lastName ?? user.lastName;
      await this.userRepository.save(user);
      return res.json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: "ocorreu um erro inesperado ao listar os usuarios" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const users = await this.userRepository.find();
      return res.json(users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: "ocorreu um erro inesperado ao listar os usuarios" });
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      if (isNaN(id)) {
        res.status(400).json({ message: "id invalido" });
      }
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: "ocorreu um erro inesperado ao deletar o pedido" });
    }
  }
  async listbyid(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      if (isNaN(id)) {
        res.status(400).json({ message: "id invalido" });
      }
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: "ocorreu um erro inesperado ao deletar o pedido" });
    }
  }
}
