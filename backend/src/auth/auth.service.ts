import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    // Retrieve the user and validate password
    // Use bcrypt
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findUserFromEmail(email);
        const comparePassword = await bcrypt.compare(pass, user.password);
        if (user && comparePassword) {
            const { password, ...result } = user;
            return result;
        }
        else
            return null;
    }

    async login(user: any) {
        const credentials = {email: user.email, userId: user.userId };
        return { 
            access_token: this.jwtService.sign(credentials), ...credentials };
    }

    async signup(user: any) {
        const newUser = await this.usersService.createUser(user);
        const credentials = {email: newUser.email, userId: newUser.userId };
        return { access_token: this.jwtService.sign(credentials), ...credentials};
    }
}