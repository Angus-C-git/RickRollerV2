import { Injectable, Redirect } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../users/users.schema';
import { LinkDocument } from '../generate/links.schema';
import { RollerTags } from './constants';
import { StatsService } from '../stats/stats.service';

@Injectable()
export class RollService {

    constructor(
        @InjectModel('Link') private readonly linkModel: Model<LinkDocument>,
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
        private readonly statsService: StatsService,
    ) {}

    /**
     * 
     * @param linkId 
     * @returns the username of the user 
     *          who owns the link
     * 
     * @todo
     *  + clean up so two save operations are not needed
     */
    async roll(linkId: string) {
        console.log(`rolling agent -> ${linkId}`);   

        const link = await this.linkModel.findByIdAndUpdate(linkId, {
            $inc: {
                clicks: 1,
            },
        });

        // find and update the users clicks, clicksHistory and campaigns
        const user = await this.userModel.findByIdAndUpdate(link.uid, {
            $inc: {
                clicks: 1,
                [`clicksHistory.${new Date().getMonth()}.clicks`]: 1,
            },
        });

        // get the index of the campaign in the users 
        // campaigns list
        const campaignIndex = user.campaigns.findIndex(
            campaign => campaign.name === link.campaign
        );
        
        // update the campaign's click count
        user.campaigns[campaignIndex].clicks += 1;
        await user.updateOne({
            $set: {
                campaigns: user.campaigns,
            },
        });

        // console.debug(link);
        // console.debug(user);        
        return link.username;
    }

    /**
     * 
     * @param linkId 
     * @returns details about a link ID
     *          importantly the link's
     *          msg should it exist
     */
    async getLinkDetails(linkId: string) {
        console.log(`pulling link details for ${linkId}`);   

        const link = await this.linkModel.findById(linkId);
        const { msg, clicks } = link;
        
        // get user stats
        const user = await this.userModel.findById(link.uid);
        const rank = await this.statsService.getRank(link.uid, user.clicks);

        // determine tags
        const tags = [];
        if (user.createdAt.getMonth() === new Date().getMonth())
            tags.push(RollerTags.NEW);        
        if (clicks === 1)
            tags.push(RollerTags.FIRST_BLOOD); 
        if (clicks >= 5)
            tags.push(RollerTags.ACE);

        // construct quick stats object
        return {
            rank,
            tags,
            msg
        }
    }
}
