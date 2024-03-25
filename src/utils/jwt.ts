import { getUnixTime } from "./date";

export interface AuthTokenInfo {
  exp: number;
  iat: number;
  login: string;
}

const LIFE_TIME_TO_UPDATE_MULTIPLIER = 0.5;

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
    return true;
  }

  try {
    const tokenInfo = token.split(".")[1];
    const tokenInfoDecoded = window.atob(tokenInfo);
    const { exp, iat }: AuthTokenInfo = JSON.parse(tokenInfoDecoded);
    const tokenLeftTime = exp - getUnixTime();
    const minLifeTimeForUpdate = (exp - iat) * LIFE_TIME_TO_UPDATE_MULTIPLIER;

    return tokenLeftTime < minLifeTimeForUpdate;
  } catch (e) {
    return true;
  }
};

export const parseJwt = (token?: string) => {
  if(!token) return null;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return `%${`0${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
