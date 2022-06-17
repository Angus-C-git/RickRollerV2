import { Bind, Body, Controller, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';
import { getCookie } from './cookie.strategy';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @Bind(Request())
    async login(req: { user: any; }, @Res({ passthrough: true }) res: Response) {
        const access_token = await this.authService.login(req.user);
        const { name, token, options} = getCookie(access_token.access_token);
        res.cookie(name, token, options);
        return access_token;
    }

    @Post('register')
    @Bind(Request())
    async register(@Body() user: RegisterUserDto, @Res({ passthrough: true }) res: Response) {
        const newUser = await this.usersService.create(user);
        // same behavior as login
        const access_token = await this.authService.login(newUser);
        const { name, token, options} = getCookie(access_token.access_token);
        res.cookie(name, token, options);
        return access_token;
    }
}
