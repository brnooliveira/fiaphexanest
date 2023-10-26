import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ description: 'Email do usuário' })
  cpf: string;
}

export class UpdateUserDto {
  name: string | null;
  cpf: string | null;
}
