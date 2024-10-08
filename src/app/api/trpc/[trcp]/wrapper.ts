import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const cors = Cors();

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: (req: NextApiRequest, res: NextApiResponse, callback: (result: unknown) => void) => void) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: unknown) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

export function withCors(handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        await runMiddleware(req, res, cors);

        return await handler(req, res);
    };
}

