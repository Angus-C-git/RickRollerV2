import { Bind, Body, Controller, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';
import { DEFAULT_NAME, getCookie } from './cookie.strategy';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    @Bind(Request())
    async login(@Body() user: LoginUserDto, @Res({ passthrough: true }) res: Response) {
        const validUser = await this.authService.validateUser(user.username, user.password);
        /** @TODO - better handling ?  */
        if (!validUser)
            throw new Error('Unauthorized')

        const access_token = await this.authService.login(validUser);
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

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie(DEFAULT_NAME);
        return true;
    }

    @UseGuards(JwtAuthGuard)
    @Post('status')
    async status() {
        return {
            status: true
        };
    }
}
