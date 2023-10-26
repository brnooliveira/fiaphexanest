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
import { CreateUserDto, UpdateUserDto } from 'src/core/application/dtos/user.dto';
import { UserUseCase } from 'src/core/application/use-cases/user-use-case';

import { User } from 'src/core/domain/entities/user';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserUseCase) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<User | null> {
    return this.userService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponseDecorator({
    status: 201,
    description: 'O usuário foi criado com sucesso.',
  })
  @ApiResponseDecorator({ status: 400, description: 'Requisição inválida.' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, UpdateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
