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
  @ApiProperty({ description: 'Nome do usuário', required: false })
  name: string | null;

  @ApiProperty({ description: 'Cpf do usuário', required: false })
  cpf: string | null;

  @ApiProperty({ description: 'Email do usuário', required: false })
  email: string | null;
}
