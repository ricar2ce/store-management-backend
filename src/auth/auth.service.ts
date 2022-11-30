import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/schemas/users.schema';
import { Model } from 'mongoose';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto;
    const encryptedPassword = await hash(password, 10);

    const createdUser = new this.userModel({
      ...registerAuthDto,
      password: encryptedPassword,
    });

    return this.userModel.create(createdUser);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;

    const findUser = await this.userModel.findOne({ username });
    if (!findUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword)
      throw new HttpException('Password is incorrect', HttpStatus.FORBIDDEN);

    const payload = { id: findUser._id, username: findUser.username };
    const token = await this.jwtService.signAsync(payload);

    return {
      user: findUser,
      token,
    };
  }
}
