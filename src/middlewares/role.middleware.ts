import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from './auth.middleware';

export const allowRole = (...roles: JwtPayload['role'][]) => {
  return (
    req: Request & { user?: JwtPayload },
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};
