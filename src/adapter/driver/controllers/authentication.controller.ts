import {
  Body,
  Controller,
  Post,
  UnauthorizedException
} from '@nestjs/common';
import { UserUseCase } from '../../../core/application/use-cases/user-use-case';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly userUseCase: UserUseCase) { }

  @Post('login')
  async login(@Body() body: { cpf: string }) {
    const token = await this.userUseCase.login(body.cpf)
    if (token) {
      return { token };
    } else {
      throw new UnauthorizedException();
    }
  }
}
