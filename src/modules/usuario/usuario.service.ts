import { ConflictError, NotFoundError } from "../../errors/HttpErrors.js";
import { User } from "../../types/User.js";
import { hashPassword } from "../../utils/hash.js";
import { CreateUserDto } from "./dto/createUser.dto.js";
import { UserRepository } from "./usuario.repository.js";

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

  async getMe(userId: string) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User não encontrado");
    }
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async getUserById(userId: string) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User não encontrado");
    }
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async deleteUser(userId: string) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User não encontrado");
    }
    await UserRepository.delete(userId);
  },
};
