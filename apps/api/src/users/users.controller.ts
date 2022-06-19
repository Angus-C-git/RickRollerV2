import { Controller, Post, UseGuards, Bind, Request, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) {}

    /**
     * Update a user's tags
     * @param req The request object
     * @returns The updated tags list
     * @memberof UsersController
     */
    @UseGuards(JwtAuthGuard)
    @Post('tags')
    @Bind(Request())
    async addTags(@Request() req: any): Promise<string[]> {
        return this.usersService.addTag(req.user.uid, req.body.tag);
    }
}
