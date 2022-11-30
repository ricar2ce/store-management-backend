import { IsEmail, IsNotEmpty } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';
import { PartialType } from '@nestjs/swagger';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
