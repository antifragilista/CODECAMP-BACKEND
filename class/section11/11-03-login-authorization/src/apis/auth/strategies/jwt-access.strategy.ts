// jwt-access.strategy.ts

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'akbjkeowfoefkowo',
        });
    }

    validate(payload) {
        console.log(payload);
        return {
            id: payload.sub,
        };
    }
}