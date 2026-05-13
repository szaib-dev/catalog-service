import { expressjwt, type GetVerificationKey } from 'express-jwt';
import jwksClient from 'jwks-rsa';
import config from 'config';
import type { Request, Response, NextFunction } from 'express';

export default expressjwt({
    secret: jwksClient.expressJwtSecret({
        jwksUri: config.get('public.key'),
        cache: true,
        rateLimit: true,
    }) as GetVerificationKey,
    algorithms: ['RS256'],
    getToken: (req: Request) => {
        const authHeader = req.headers.authorization;
        const bearerToken = authHeader?.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : undefined;

        if (
            bearerToken &&
            bearerToken !== 'undefined' &&
            bearerToken !== 'null'
        ) {
            return bearerToken;
        }

        const { accessToken } = req.cookies;

        if (accessToken) {
            return accessToken;
        }

        return undefined;
    },
}) as (req: Request, res: Response, next: NextFunction) => void;
