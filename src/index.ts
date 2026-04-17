import "reflect-metadata";
import express from "express";
import type { Application } from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { userRoutes } from "./routes/userRoutes";
import { error } from "node:console";
import { postRoutes } from "./routes/postRoutes";

const app: Application = express();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("banco conectado");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("erro ao conectar no banco ", error));
