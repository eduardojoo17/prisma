import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import type { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/apiError";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName } = req.body;
      const newUser = this.userRepository.create({ firstName, lastName });
      await this.userRepository.save(newUser);
      return res.status(201).json(newUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const { firstName, lastName } = req.body;
      if (isNaN(id)) {
        throw new BadRequestError("Id invalido");
      }
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundError("Usuario não Encontrado");
      }
      user.firstName = firstName ?? user.firstName;
      user.lastName = lastName ?? user.lastName;
      await this.userRepository.save(user);
      return res.json(user);
    } catch (error: unknown) {
      next(error);
    }
  };

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userRepository.find();
      return res.json(users);
    } catch (error: unknown) {
      next(error);
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    try {
      if (isNaN(id)) {
        throw new BadRequestError("Id invalido");
      }
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundError("Usuario não Encontrado");
      }
      return res.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  };
  listbyid = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    try {
      if (isNaN(id)) {
        throw new BadRequestError("Id invalido");
      }
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundError("Usuario não Encontrado");
      }
      return res.json(user);
    } catch (error: unknown) {
      next(error);
    }
  };

  toggleActive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new BadRequestError("Id invalido");
      }
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundError("Usuario não Encontrado");
      }
      user.isActive = !user.isActive;
      await this.userRepository.save(user);
      return res.json({
        message: `usuario ${
          user.isActive ? "ativado" : "desativado"
        } com sucesso`,
        user,
      });
    } catch (error: unknown) {
      next(error);
    }
  };

  listActive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userRepository.findBy({ isActive: true });
      return res.json(users);
    } catch (error: unknown) {
      next(error);
    }
  };
}
