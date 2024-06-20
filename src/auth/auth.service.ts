import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/auth.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  // login(loginDto: LoginDto): Promise<{ token: string; }> {
  //   throw new Error('Method not implemented.');
  // }
   constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    private jwtService: JwtService
   ){}
  async signUp(signUpDto: SignUpDto): Promise<{token: string}> {
   const {name , email, password} = signUpDto

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword
    })

    const token = this.jwtService.sign({ id: user._id })

    return {token}
  }

  findAll() {
    return `This action returns all auth`;
  }

  
  async login(loginDto: LoginDto): Promise<{token: string}> {
    const {email, password} = loginDto

    const user = await this.userModel.findOne({email})

    if(!user) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if(!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password')
    }
    const token = this.jwtService.sign({ id: user._id })

    return {token}
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
