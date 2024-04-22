import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      console.log(context.switchToHttp().getRequest().user);
      return context.switchToHttp().getRequest().user;
    } else if (context.getType() === 'rpc') {
      return context.switchToRpc().getData().user;
    }
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
