import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/users.schema';

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
    const currentRank = await this.getRank(uid, user.clicks);

    // calculate the rank increase
    const rankIncrease = (currentRank / user.previousRank) * 100; 

    // determine if the previous rank should be updated
    // by checking if the rank was updated more 
    // than 24 hours from now
    const now = new Date();
    const lastUpdated = new Date(user.rankUpdated);
    const timeDiff = now.getTime() - lastUpdated.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays > 1) {
        user.previousRank = currentRank;
        user.rankUpdated = now;
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

      return rank;
  }
}



/**
 *  === Calculating Increases ===
 * 
 *  + The rank is calculated by taking the total number of clicks a user has
 *  + Rank increase is regarded as the difference between the current rank and 
 *    the previous rank _stored_ in the database
 * 
 *  + This is to avoid the need for a scheduled job to store the previous rank within 
 *    a particular timeframe
 *  + Thus a users previous rank is stored in the database either when:
 *     1. A user checks their stats and the previous rank has not been updated
 *        within 24hours
 *     2. A users account is created 
 */
