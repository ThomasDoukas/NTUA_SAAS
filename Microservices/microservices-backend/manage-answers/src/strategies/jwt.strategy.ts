import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // Options specific to the strategy
    // Delegates the responsibility of ensuring that a JWT has not expired to the Passport module. 
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'saasSecretKey',
            // secretOrKey: process.env.JWT_SECRET,
        });
    }

    // Passport first verifies the JWT's signature and decodes the JSON.
    // It then invokes validate() method passing the decoded JSON as its single parameter.
    // As described in local.strategy the returned value will be assigned to the Request object as req.user
    async validate(payload: any){
        // find if user exists
        const user = await this.usersService.findUserFromEmail(payload.email)
        if(!user) throw new NotFoundException('User not found') 
        return {userId: payload.userId, email: payload.email}
    }
}