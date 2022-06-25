import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
import { LINK_GEN_URI, DOMAIN_URI_PREFIX, LINK_PREFIX } from './constants';
import { ConfigService } from '@nestjs/config';
import { LinkDto } from './dto/link.dto';
import { LinkDocument } from './links.schema';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/users.schema';
import { DATE_OPTIONS } from 'src/globals/dates';

@Injectable()
export class GenerateService {
  constructor(
    @InjectModel('Link') private readonly linkModel: Model<LinkDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}
  
  /**
   * 
   * @param linkDetails 
   * @param uid 
   * @param username 
   * @returns A shortened link which can be used to
   *          trigger a roll via a redirect
   */
  async generateLink(linkDetails: LinkDto, uid: string, username: string) { 
    // enable hacky dev debugging for link gen
    const DEBUG = false;

    const { name, campaign, tags, msg } = linkDetails;

    /**
     * - Create and entry in the links collection with the following details:
     *    - The UID of the user that is generating the link
     *    - The campaign it belongs to
     *    - The links tags
     */
    
    // check if link name is already in use
      // for now we don't care about this
    // const usersLinks = await this.linkModel.find({ uid, name });
    // if (usersLinks.length > 0) {
    //   throw new Error('Link name already in use');
    // }

    // create link document
    const linkDocument: LinkDocument = new this.linkModel({
      uid,
      username,
      name,
      campaign,
      tags,
      msg,
    });

    // save link document
    const newLink = await linkDocument.save();

    /**
     *  - pull the saved links object ID  
     *  - use the ID to seed the generation of a link using
     *    the firebase dynamic link API 
    * */ 
    const body = {
      'dynamicLinkInfo': {
        'domainUriPrefix': DOMAIN_URI_PREFIX,
        'link': `${LINK_PREFIX}/${newLink._id}`,
      }
    }

    const API_KEY = this.configService.get<string>('FIREBASE_API_KEY');

    const response = await axios.post(
      `${LINK_GEN_URI}?key=${API_KEY}`,
      body
    )

    // check for errors
    if (response.data.error) {
      console.log(response.data.error.message);
      return null;
    }

    if (response.data.warning && DEBUG)
      console.debug(response.data.warning);

    console.debug('Link generated >>', response.data.shortLink); 


    /**
     * - save the generated link to the created link record
     * - Links should take the following form:
     * 
     *    >> https://<api_base>/resolve/[link_id]
     */

    newLink.url = response.data.shortLink;
    const updatedLink = await newLink.save();

    // update users generated links
    const user = await this.userModel.findByIdAndUpdate(
      uid ,
      {
        $inc: {
          generatedLinks: 1
        },
      }
    );
    
    // add the campaign to the users campaigns array
    // if it is new
    const newCampaign = user.campaigns.find(
      campaign => campaign.name === linkDetails.campaign
    );
    if (!newCampaign) {
      user.campaigns.push({
        name: linkDetails.campaign,
        clicks: 0,
        started: new Date().toLocaleDateString('en-US', DATE_OPTIONS)
      });

      // save the user
      await user.save();
    }


    // return the link to the user
    // return response.data.shortLink;
    return updatedLink;
  }


  /**
   * get campaign names and tags for a user
   * 
   * @param uid
   * @returns an array of campaign names
   */
  async getOptions(uid: string) {
    const user = await this.userModel.findById(uid);
    return {
      campaigns: user.campaigns.map(campaign => campaign.name),
      tags: user.tags,
    }
  }
}
