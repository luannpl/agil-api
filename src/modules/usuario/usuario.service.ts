import { CreateUserDto } from "./dto/createUser.dto";
import { UserRepository } from "./usuario.repository";

export const UserService = {
  async createUser(data: CreateUserDto) {
    const user = await UserRepository.create(data);
    return user;
  },
};
