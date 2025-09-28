import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../errors/HttpErrors.js";
import { User } from "../../types/User.js";
import { ChangePasswordDto } from "./dto/changePassword.dto.js";
import { comparePassword, hashPassword } from "../../utils/hash.js";
import { CreateUserDto } from "./dto/createUser.dto.js";
import { UpdateUserDto } from "./dto/updateUser.dto.js";
import { UserRepository } from "./usuario.repository.js";

export const UserService = {
  async createUser(data: CreateUserDto) {
    const existingUser = await UserRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError("Email já cadastrado");
    }
    if (data.cpf && (await UserRepository.findByCpf(data.cpf))) {
      throw new ConflictError("CPF já cadastrado");
    }
    if (data.rg && (await UserRepository.findByRg(data.rg))) {
      throw new ConflictError("RG já cadastrado");
    }
    if (data.cnh && (await UserRepository.findByCnh(data.cnh))) {
      throw new ConflictError("CNH já cadastrado");
    }
    data.senha = await hashPassword(data.senha);
    data.dataNasc = data.dataNasc ? new Date(data.dataNasc) : undefined;
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

  async getFuncionarios() {
    const funcionarios = await UserRepository.findFuncionarios();
    return funcionarios.map(
      ({ senha, ...userWithoutPassword }) => userWithoutPassword
    );
  },

  async searchCliente(cpf: string) {
    const cliente = await UserRepository.findByCpf(cpf);
    if (!cliente) {
      throw new NotFoundError("Cliente não encontrado");
    }
    const { senha, ...userWithoutPassword } = cliente;
    return userWithoutPassword;
  },

  async getUserById(userId: string) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async updateUser(userId: string, data: UpdateUserDto) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User não encontrado");
    }
    if (data.email && data.email !== user.email) {
      const existingUser = await UserRepository.findByEmail(data.email);
      if (existingUser) {
        throw new ConflictError("Email já cadastrado");
      }
    }
    const updatedUser = await UserRepository.update(userId, data);
    const { senha, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  },

  async changePassword(userId: string, data: ChangePasswordDto) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User não encontrado");
    }
    const isPasswordCorrect = await comparePassword(
      data.senhaAtual!,
      user.senha
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedError("Senha antiga incorreta");
    }
    const novaSenha = await hashPassword(data.novaSenha!);
    const usuarioAtualizado = await UserRepository.update(userId, {
      senha: novaSenha,
    });
    const { senha, ...userWithoutPassword } = usuarioAtualizado;
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
