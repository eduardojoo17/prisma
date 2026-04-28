import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Post } from "./Post";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Validate,
  validate,
} from "class-validator";
import { isBrPhoneConstraint } from "../decorators/isBrPhone";
@Entity()
// @Unique(["email"]) <-- Comente isso temporariamente se não quiser apagar os dados
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  @IsNotEmpty({ message: "Primeiro nome é obrigatório!" })
  firstName!: string;

  @Column("varchar")
  @IsNotEmpty({ message: "Sobrenome é obrigatório!" })
  lastName!: string;

  @Column({ type: "varchar", length: 15, nullable: false })
  @IsNotEmpty({ message: "o celular é obrigatorio" })
  @Validate(isBrPhoneConstraint)
  phone!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "varchar", nullable: true })
  @IsEmail({}, { message: "O email fornecido não é válido" })
  email!: string;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];
}
