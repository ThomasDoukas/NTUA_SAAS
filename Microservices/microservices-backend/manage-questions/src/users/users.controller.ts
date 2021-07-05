import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User } from 'src/entites/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @MessagePattern({cmd: 'create_user'})
    createUser(payload: CreateUserDto): Promise<User>{
        return this.usersService.createUser(payload);
    }

    @MessagePattern({cmd: 'update_user'})
    updateUser(payload: UpdateUserDto): Promise<User>{        
        return this.usersService.updateUser(payload);
    }

    @MessagePattern({cmd: 'delete_user'})
    removeUser(payload: number): Promise<any>{
        return this.usersService.removeUser(payload);
    }
}
