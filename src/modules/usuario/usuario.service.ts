import { ConflictError } from "../../errors/HttpErrors";
import { User } from "../../types/User";
import { hashPassword } from "../../utils/hash";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserRepository } from "./usuario.repository";

export const UserService = {
  async createUser(data: CreateUserDto) {
    const existingUser = await UserRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError("Email já cadastrado");
    }
    data.senha = await hashPassword(data.senha);
    const user: User = await UserRepository.create(data);
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async getAllUsers() {
    const users: User[] = await UserRepository.findAll();
    return users.map(
      ({ senha, ...userWithoutPassword }) => userWithoutPassword
    );
  },
};
