import { Bind, Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @Bind(Request())
    async login(req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() user: RegisterUserDto) {
        const newUser = await this.usersService.create(user);
        return this.authService.issueToken(newUser);
    }
}
