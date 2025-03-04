import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user-entity.entity';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { UserType } from './entities/current-user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String) 
  async hello() {
    return 'hello';
  }

  @Query(() => UserType)
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user:UserType) {
      return user;
  }

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUserData') createUserData: CreateUserDto,
  ): Promise<UserEntity> {
    return this.userService.createUser(createUserData);
  }

  @Mutation(() => UserEntity)
  async login(
    @Args("loginDto") loginDto: LoginDto
  ): Promise<UserEntity> {
      return this.userService.login(loginDto);
  }
}
