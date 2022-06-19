import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './users.schema';
import { User } from './interfaces/user.interface';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: RegisterUserDto): Promise<User> {

    const userDocument: UserDocument = new this.userModel(user);

    // encrypt password with bcrypt
    const saltOrRounds = 10;
    userDocument.password = await bcrypt.hash(user.password, saltOrRounds);

    // save user
    const newUser = await userDocument.save();

    return newUser;
  }

  async findUser(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
    //   throw new Error('User not found');
      return null;
    }

    return user;
  }

  /**
   * Add a tag to a user's list of tags
   */
  async addTag(uid: string, tag: string): Promise<string[]> {
    console.log('[>>] adding tag for', uid, tag);

    const user = await this.userModel.findByIdAndUpdate(uid, { $addToSet: { tags: tag } });
    if (!user) {
      throw new Error('User not found');
    }

    return user.tags;
  }
}
