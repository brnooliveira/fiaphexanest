import { Body, Controller, HttpCode, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IUserUseCase } from '../../../core/application/use-cases/user-use-case.interface';
import { USER_USE_CASE } from '../../../core/application/constants/tokens';

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
  constructor(@Inject(USER_USE_CASE) private readonly userUseCase: IUserUseCase) { }

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

