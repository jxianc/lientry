import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

// NOTE resolver using this decorator should use authguard (attach user obj to req)
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    console.log('from deco', ctx.getContext().req.user)
    return ctx.getContext().req.user
  },
)
