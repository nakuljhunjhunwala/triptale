import httpStatusCodes from "http-status-codes";

export function globalSettings(): void {
  global.httpStatus = httpStatusCodes;
}
