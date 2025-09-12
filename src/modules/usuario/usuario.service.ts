import { ConflictError, NotFoundError } from "../../errors/HttpErrors.js";
import { User } from "../../types/User.js";
import { hashPassword } from "../../utils/hash.js";
import { CreateUserDto } from "./dto/createUser.dto.js";
import { UpdateUserDto } from "./dto/updateUser.dto.js";
import { UserRepository } from "./usuario.repository.js";

export const UserService = {
  async createUser(data: CreateUserDto) {
    // Executa todas as validações de unicidade em paralelo
    const validationPromises: Promise<unknown>[] = [
      UserRepository.findByEmail(data.email),
    ];

    if (data.tipo === "cliente" && data.clienteProfile) {
      const { cpf, rg, cnh } = data.clienteProfile;
      validationPromises.push(UserRepository.findClienteByCpf(cpf));
      if (rg) validationPromises.push(UserRepository.findClienteByRg(rg));
      if (cnh) validationPromises.push(UserRepository.findClienteByCnh(cnh));
    }

    const [existingUser, existingCpf, existingRg, existingCnh] =
      await Promise.all(validationPromises);

    // Agora, verifica os resultados
    if (existingUser) throw new ConflictError("Email já cadastrado");
    if (existingCpf) throw new ConflictError("CPF já cadastrado");
    if (existingRg) throw new ConflictError("RG já cadastrado");
    if (existingCnh) throw new ConflictError("CNH já cadastrada");
    data.senha = await hashPassword(data.senha);

    const { user, clienteProfile } = await UserRepository.createUserWithProfile(
      data
    );

    const { senha, ...userWithoutPassword } = user;
    return clienteProfile
      ? { ...userWithoutPassword, clienteProfile }
      : userWithoutPassword;
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
    data.senha = data.senha ? await hashPassword(data.senha) : user.senha;
    const updatedUser = await UserRepository.update(userId, data);
    const { senha, ...userWithoutPassword } = updatedUser;
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
