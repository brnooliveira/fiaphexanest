import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ description: 'Cpf do usuário' })
  cpf: string;

  @ApiProperty({ description: 'Email do usuário' })
  email: string;
}

export class UpdateUserDto {
  name: string | null;
  cpf: string | null;
  email: string | null;
}
