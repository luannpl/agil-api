import { DecodedToken } from "./jwt";

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
