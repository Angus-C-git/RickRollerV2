import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { User } from './users.schema';
import { LoginUserDto } from './dto/login-user.dto';
// import bcrypt from 'bcrypt';

@Controller('user')
export class UsersController {}
