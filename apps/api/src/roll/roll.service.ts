import { Injectable, Redirect } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../users/users.schema';
import { LinkDocument } from '../generate/links.schema';
import { RollerTags } from './constants';

@Injectable()
export class RollService {

    constructor(
        @InjectModel('Link') private readonly linkModel: Model<LinkDocument>,
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
    ) {}

    /**
     * 
     * @param linkId 
     * @returns the username of the user 
     *          who owns the link
     * 
     * @todo
     * 
     *  + Increase the campaigns click count in the
     *    users collection
     *  + Increment the current month's click count in 
     *    the users clocks history object
     */
    async roll(linkId: string) {
        console.log(`rolling agent -> ${linkId}`);   

        const link = await this.linkModel.findByIdAndUpdate(linkId, {
            $inc: {
                clicks: 1,
            },
        });

        console.debug(link);        
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
        const { rank } = user;     

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
