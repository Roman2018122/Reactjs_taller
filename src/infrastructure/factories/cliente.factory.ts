import { AxiosClienteRepository } from "@/infrastructure/adapters/axios-cliente.repository";

import { GetClientesUseCase } from "@/application/use-cases/clientes/get-clientes.usecase";
import { GetClienteByIdUseCase } from "@/application/use-cases/clientes/get-cliente-by-id.usecase";
import { CreateClienteUseCase } from "@/application/use-cases/clientes/create-cliente.usecase";
import { UpdateClienteUseCase } from "@/application/use-cases/clientes/update-cliente.usecase";
import { DeleteClienteUseCase } from "@/application/use-cases/clientes/delete-cliente.usecase";

const repository = new AxiosClienteRepository();

export const clienteFactory = {

  repository,

  getClientes: new GetClientesUseCase(
    repository,
  ),

  getClienteById: new GetClienteByIdUseCase(
    repository,
  ),

  createCliente: new CreateClienteUseCase(
    repository,
  ),

  updateCliente: new UpdateClienteUseCase(
    repository,
  ),

  deleteCliente: new DeleteClienteUseCase(
    repository,
  ),

};