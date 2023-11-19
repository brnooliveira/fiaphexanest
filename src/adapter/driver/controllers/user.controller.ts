import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse as ApiResponseDecorator, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { USER_USE_CASE } from '../../../core/application/constants/tokens';
import { CreateUserDto, UpdateUserDto } from '../../../core/application/dtos/user.dto';
import { IUserUseCase } from '../../../core/application/use-cases/user-use-case.interface';
import { User } from '../../../core/domain/entities/user';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(@Inject(USER_USE_CASE) private readonly userUseCase: IUserUseCase) { }

  @Get()
  @ApiOperation({ summary: 'Obter todos os usuários' })
  @ApiResponseDecorator({ status: 200, description: 'Lista de usuários', type: [User] })
  findAll(): Promise<User[]> {
    return this.userUseCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponseDecorator({ status: 200, description: 'Detalhes do usuário', type: User })
  @ApiResponseDecorator({ status: 404, description: 'Usuário não encontrado' })
  findById(@Param('id') id: string): Promise<User | null> {
    return this.userUseCase.findById(id);
  }

  @Get('cpf/:cpf')
  @ApiOperation({ summary: 'Obter um usuário pelo CPF' })
  @ApiParam({ name: 'cpf', description: 'CPF do usuário' })
  @ApiResponseDecorator({ status: 200, description: 'Detalhes do usuário', type: User })
  @ApiResponseDecorator({ status: 404, description: 'Usuário não encontrado' })
  findByCpf(@Param('cpf') cpf: string): Promise<User | null> {
    return this.userUseCase.findByCpf(cpf);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponseDecorator({
    status: 201,
    description: 'O usuário foi criado com sucesso.',
  })
  @ApiResponseDecorator({ status: 400, description: 'Requisição inválida.' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userUseCase.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiBody({ type: UpdateUserDto, description: 'Dados para atualizar o usuário' })
  @ApiResponseDecorator({ status: 200, description: 'Usuário atualizado com sucesso', type: User })
  @ApiResponseDecorator({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponseDecorator({ status: 400, description: 'Requisição inválida' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userUseCase.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponseDecorator({ status: 200, description: 'Usuário deletado com sucesso' })
  @ApiResponseDecorator({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponseDecorator({ status: 400, description: 'Requisição inválida' })
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.userUseCase.delete(id);
  }
}

