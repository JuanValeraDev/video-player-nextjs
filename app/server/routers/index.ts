import {t} from '../trpc/trpc'

export const appRouter = t.router({
    sayHi: t.procedure.query(() => {
        return "Hi"
    })
})
