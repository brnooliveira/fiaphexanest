import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse as ApiResponseDecorator,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../../../core/application/dtos/user.dto';
import { UserUseCase } from '../../../core/application/use-cases/user-use-case';

import { User } from '../../../core/domain/entities/user';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userUseCase.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<User | null> {
    return this.userUseCase.findById(id);
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
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userUseCase.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.userUseCase.delete(id);
  }
}
