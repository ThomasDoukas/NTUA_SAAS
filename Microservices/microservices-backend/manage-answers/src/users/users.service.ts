import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from 'src/dto/user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectEntityManager('msManageAnswersUsersConnection') private manager: EntityManager
    ) { }

    // Use email to find user
    async findUserFromEmail(email: string): Promise<User> {
        const userExists = await this.manager.findOne(User, { where: { email: email } });
        if (!userExists) throw new NotFoundException(`User not found`);
        return userExists;
    }
}
