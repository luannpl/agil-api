import { ContatoRepository } from "./contato.repository.js";
import { CreateContatoDto } from "./dto/createContato.dto.js";

export const ContatoService = {
  async createContato(data: CreateContatoDto) {
    const contato = await ContatoRepository.create(data);
    return contato;
  },

  async getAllContatos() {
    const contatos = await ContatoRepository.getAll();
    return contatos;
  },
};
