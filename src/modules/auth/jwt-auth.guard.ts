import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private static publicRoutes = [
    { path: '/auth/login', method: 'POST' },
    { path: '/auth/register', method: 'POST' },
  ];

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { url, method } = request;

    // Check if current route is public (skip auth)
    const isPublic = JwtAuthGuard.publicRoutes.some(
      (route) => route.path === url && route.method === method,
    );

    if (isPublic) {
      return true; // Skip auth guard
    }

    return super.canActivate(context);
  }
}
