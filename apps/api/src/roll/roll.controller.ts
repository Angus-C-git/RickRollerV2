import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { RollService } from './roll.service';

@Controller('roll')
export class RollController {
    constructor(
        private readonly rollService: RollService,
    ) {}
    
    /**
     * Application function responsible for handling clicked links
     * 
     * redirect users to a frontend page with the link 
     * owners username and link id
     */
    @Get(':id')
    @Redirect()
    async roll(@Param('id') linkId: string) {
        const rollers_username = await this.rollService.roll(linkId);
       
        return {
            url: `http://localhost:3002/rolled/${rollers_username}/${linkId}`,
        }
    }

    @Get('/details/:id')
    async getLinkDetails(@Param('id') linkId: string) {
        const details = await this.rollService.getLinkDetails(linkId);
        return details;
    }
}
