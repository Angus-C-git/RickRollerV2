import { Bind, Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GenerateService } from './generate.service';

@Controller('generate')
export class GenerateController {

    constructor(
        private readonly generateService: GenerateService,
    ) {}

    /**
     * Generate a link and associated document to
     * store details about it
     * 
     * @param linkDetails 
     * @param req
     * @returns 
     */
    @UseGuards(JwtAuthGuard)
    @Post('link')
    @Bind(Request())
    async generateLink(@Body() linkDetails: any, @Request() req: any) {
        return this.generateService.generateLink(
            linkDetails, 
            req.user.uid,
            req.user.username
        );
    }
}


/**
 *  - APPROACH -
 * 
 * 
 * + Users generate links with data about the phishing campaign 
 *   it belongs to as well as the users UID
 * 
 * + Links are generated with a Firebase Dynamic Link
 * 
 * + The link should then be stored in a global collection (lookup table)
 *   and when clicked should resolve to a API endpoint that will query
 *   the database and perform a lookup on the link to resolve information
 *   about it and update relevant records such as the campaign stats and
 *   user scores 
 * 
 * + Thus links should roughly resolve in the following way:
 *      
 *      -> https://zzen9201.page.link/[b64_ID] -> https://<api_base>/resolve/[link_id]
 *  
 * 
 * + The link should also be stored in the user record so that the user
 *   can see all the links they have generated
 * 
 * + The link should be stored in the database with the following details:
 *      - The UID of the user that generated the link
 *      - The campaign it belongs to 
 *      - The links tags 
 *      - Number of clicks
 * 
 */
