import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

//   async validateUser(email: string, password: string): Promise<any> {
//     const user = await this.userRepository.findOne({ where: { email } });
//     if (user && (await bcrypt.compare(password, user.password))) {
//       const { password, ...result } = user;
//       return result;
//     }
//     throw new UnauthorizedException('Invalid credentials');
//   }

//   async login(user: any) {
//     const payload = { email: user.email, sub: user.id, roles: user.roles.map(role => role.name) };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashedPassword });
    return this.userRepository.save(user);
  }
}
