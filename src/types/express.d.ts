import { DecodedToken } from "./jwt.js";

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
