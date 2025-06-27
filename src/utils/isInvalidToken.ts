import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../types/types";

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};
