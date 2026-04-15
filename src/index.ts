import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Banco conectado");
    const userRepository = AppDataSource.getRepository(User);

    const newUser = userRepository.create({
      firstName: "joão",
      lastName: "eduardo",
    });
    await userRepository.save(newUser);
    const allUsers = await userRepository.find();
    console.log("usuarios cadastrados: ", allUsers);
  } catch (error) {
    console.log("erro: ", error);
  }
}

main();
