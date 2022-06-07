import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/users.schema';
import { ONE_DAY } from './constants';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * 
   * @param uid 
   * @returns The users statistics
   * 
   * @todo 
   * 
   *  + Calculate click increase
   *  + calculate generated link increase
   */
  async getStats(uid: string) {

    console.log(`pulling stats for ${uid}`);

    // pull the user from the database
    const user = await this.userModel.findById(uid);

    // get the users current rank
    let currentRank = await this.getRank(uid, user.clicks);
    // if no other user has more clicks, the user is the first
    if (!currentRank) currentRank = 1;

    // save the users current rank, for admin
    // do this synchronously
    user.updateOne({
        $set: {
            rank: currentRank,
        },
    });

    // calculate the rank increase as a percentage
    // increase or decrease based on the previous rank and 
    // the current rank
    const rankDifference = user.previousRank - currentRank;
    let rankIncrease = rankDifference / (
                          rankDifference > 0 ? user.previousRank : currentRank
                      ) * 100;

    // round the rank increase to two decimal places
    rankIncrease = Math.round(rankIncrease * 100) / 100;

    // if the user has not had a previous rank, 
    // set the rankIncrease to 0
    if (!user.previousRank) rankIncrease = 0;
    
    console.log(`
        rankIncrease: ${rankIncrease}, 
        previous rank: ${user.previousRank}, 
        currentRank: ${currentRank}`
    );


    /**
     * - click increase
     * - generated links increase
     */



 
    /** 
     * @TODO
     *    - This update should occur at the same time
     *      as other increases are calculated and
     *      thus only a single update is needed to 
     *      update all previous values
     */

    // determine if the previous rank should be updated
    // by checking if the rank was updated more 
    // than 24 hours from now
    const now = new Date();
    const lastUpdated = new Date(user.recordsLastUpdated);
    console.debug(`
        now: ${now},
        lastUpdated: ${lastUpdated}`
    );
    const timeDiff = now.getTime() - lastUpdated.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays > ONE_DAY || !user.previousRank) {
        user.previousRank = currentRank;
        /** @TODO add other priors */

        user.recordsLastUpdated = now;
        user.save();
    }

    // return the users statistics
    return {
        generatedLinks: user.generatedLinks,
        netCampaigns: user.campaigns.length,
        campaigns: user.campaigns,
        clicksHistory: user.clicksHistory,
        rank: currentRank,
        rankIncrease: rankIncrease,
        campaignsSince: user.createdAt,
    };
  }

  async getRank(uid: string, clicks: number) {
          
      console.log(`pulling rank for ${uid}`);

      // count the number of users found whose 
      // clicks is greater than the current user      
      const rank = await this.userModel.countDocuments({
          clicks: {
              $gt: clicks,
          },
      });

      // ranks start at 1
      return rank + 1;
  }
}
