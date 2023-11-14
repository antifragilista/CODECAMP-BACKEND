import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
    imports: [
        JwtModule.register({}), // jwtService 주입을 위함
        UsersModule, // user table과 UserService를 사용하기 위함
    ],
    providers: [
        AuthResolver,
        AuthService,
    ],
})
export class AuthModule {}