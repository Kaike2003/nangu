import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class Auth {
  private constructor() {}

  public static create() {
    return new Auth();
  }

  public execute() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (token === null) {
          res.status(401);
          return;
        }

        jwt.verify(token as string, process.env.SECRET as string, (err, user) => {
          if (err) {
            res.status(403);
            return;
          }

          next();
        });
      } catch (error) {
        res.status(404).json(error);
      }
    };
  }
}
