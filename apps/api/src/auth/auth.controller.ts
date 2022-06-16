import { Bind, Body, Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @Bind(Request())
    async login(req, @Res({ passthrough: true }) res: Response) {
        const access_token = await this.authService.login(req.user);
        /** @TODO - relocate  */
        res.cookie('access_token', access_token.access_token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false, 
            maxAge: 1000 * 60 * 60 * 24 * 7,
            domain: 'localhost',
            path: '/'
        });

        return access_token;
    }

    @Post('register')
    async register(@Body() user: RegisterUserDto) {
        const newUser = await this.usersService.create(user);
        return this.authService.issueToken(newUser);
    }
}
