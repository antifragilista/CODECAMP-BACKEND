// context.ts

import { Request, Response } from 'express';

export interface IAuthUser {
    user?: {
        email: string;
        id: string;
    };
}

export interface IContext {
    req: Request & IAuthUser;
    res: Response;
}