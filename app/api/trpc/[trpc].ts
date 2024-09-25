import {createNextApiHandler} from '@trpc/server/adapters/next';
import {createContext} from '../../server/trpc/context'
import {appRouter} from '../../server/routers'

// @link https://nextjs.org/docs/api-routes/introduction
export default createNextApiHandler({
    router: appRouter,
    createContext
});

export type AppRouter = typeof appRouter
