import { Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { UserUseCase } from '../../../core/application/use-cases/user-use-case';
import { ApiBody, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

class LoginDto {
  @ApiProperty({ description: 'CPF do usuário' })
  cpf: string;
}

class TokenDto {
  @ApiProperty({ description: 'Token de acesso' })
  token: string;
}

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiBody({ description: 'Credenciais do usuário', type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login bem-sucedido', type: TokenDto })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async login(@Body() body: { cpf: string }) {
    const token = await this.userUseCase.login(body.cpf);
    if (token) {
      return { token };
    } else {
      throw new UnauthorizedException();
    }
  }
}

