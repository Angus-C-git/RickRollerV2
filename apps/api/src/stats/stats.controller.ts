import { Controller, Get, UseGuards, Request, Bind } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
    constructor(
        private readonly statsService: StatsService,
    ) {}

    /**
     * Retrieve a users statistics from the database
     * 
     * @param req  The request object including the user
     *             pulled from the guard
     * 
     * @returns   The users statistics in the form 
     * 
     *              {
     *                 generatedLinks: number,
     *                 netCampaigns: number,
     *                 campaigns: [
     *                    {
     *                      name: string,
     *                      clicks: number,
     *                      started: date,
     *                    }
     *                 ],
     *                 clicksHistory: [
     *                   {  
     *                     date: date,
     *                     clicks: number,
     *                   },
     *                 ],
     *                 rank: number,
     *                 rankIncrease: decimal, 
     *              }
     */
    @UseGuards(JwtAuthGuard)
    @Get()
    @Bind(Request())
    async getStats(@Request() req: any) {
        return this.statsService.getStats(req.user.uid);
    }
}
