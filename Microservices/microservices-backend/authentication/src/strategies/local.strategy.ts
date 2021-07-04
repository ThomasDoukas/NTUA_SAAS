import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppService } from '../app.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    // Options specific to the strategy
    constructor(private appService: AppService) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    // Callback on how to interact with user storage
    // According to Passport, here we should return a user object.
    // The returned value by validate() callback will be assigned to the Request object as req.user
    async validate(email: string, password: string): Promise<any> {
        console.log('First! validate in local.strategy.ts');
        const user = await this.appService.validateUser(email, password);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        return user;
    }
}