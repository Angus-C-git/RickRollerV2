import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DATE_OPTIONS } from 'src/globals/dates';
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
   * @notes 
   *    - Percentile increase/decrease relies
   *      on this method being invoked semi-regularly
   *      to avoid results becoming too stale 
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
    
    // calculate click increase based on the 
    // percentage increase or decrease between
    // the current click count and the previous
    // record
    const clickDifference = user.clicks - user.previousClicks ;
    let clickIncrease = clickDifference / (
                            clickDifference > 0 ? user.previousClicks : user.clicks
                        ) * 100;
    // round to two decimal palaces to get a renderable percentile 
    clickIncrease = Math.round(clickIncrease * 100) / 100;  
    
    // perform same calculation for link generation
    const generatedDifference = user.generatedLinks - user.previousGeneratedLinks; 
    let generatedIncrease = generatedDifference / (generatedDifference > 0 ? 
        user.previousGeneratedLinks 
        : 
        user.generatedLinks
    ) * 100;  
    generatedIncrease = Math.round(generatedIncrease * 100) / 100;


    console.log(`
        rankIncrease: ${rankIncrease}, 
        previous rank: ${user.previousRank}, 
        currentRank: ${currentRank},
        clickIncrease: ${clickIncrease},
        clicks: ${user.clicks},
        previous clicks: ${user.previousClicks},
        generated: ${user.generatedLinks},
        generatedIncrease: ${generatedIncrease},
        previous generated: ${user.previousGeneratedLinks},
    `);



    // determine if the previous stats should be updated
    // by checking if the last update occurred more 
    // than 24 hours from now, this facilitates 
    // future increase calculations
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
        user.previousClicks = user.clicks;
        user.previousGeneratedLinks = user.generatedLinks;

        user.recordsLastUpdated = now;
        user.save();
    }

    // return the users statistics
    return {
        generatedLinks: user.generatedLinks,
        generatedIncrease: generatedIncrease,
        netCampaigns: user.campaigns.length,
        campaigns: user.campaigns,
        clicks: user.clicks,
        clicksHistory: user.clicksHistory,
        clickIncrease: clickIncrease,
        rank: currentRank,
        rankIncrease: rankIncrease,
        campaignsSince: user.createdAt.toLocaleDateString('en-us', DATE_OPTIONS),
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
