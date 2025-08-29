import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client.js";
import { DecodedToken } from "../types/jwt";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.accessToken;
  if (!token) {
    res.status(401).json({ error: "Token not provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    const user = await prisma.usuario.findUnique({ where: { id: decoded.id } });
    if (!user) {
      res.status(401).json({ error: "User no longer exists" });
      return;
    }

    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "Expired token" });
      return;
    }
    res.status(401).json({ error: "Invalid token" });
  }
};
