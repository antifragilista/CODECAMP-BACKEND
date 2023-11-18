import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
    imports: [
        JwtModule.register({}), // jwtService 주입을 위함
        UsersModule, // user table과 UserService를 사용하기 위함
    ],
    providers: [
        JwtAccessStrategy,  // 전역에서 작동하므로 어디서 import하든 상관은 없음
        AuthResolver,
        AuthService,
    ],
})
export class AuthModule {}