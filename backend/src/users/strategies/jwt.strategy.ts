import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // Options specific to the strategy
    // Delegates the responsibility of ensuring that a JWT has not expired to the Passport module. 
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
            // secretOrKey: process.env.JWT_SECRET,
        });
    }

    // Passport first verifies the JWT's signature and decodes the JSON.
    // It then invokes validate() method passing the decoded JSON as its single parameter.
    // As described in local.strategy the returned value will be assigned to the Request object as req.user
    async validate(payload: any){
        return {userId: payload.sub, email: payload.email}
    }
}