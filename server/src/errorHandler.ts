import { Response } from 'express';

export const jsonResponse = (errMsg: Error | string) => ({ errMsg });

const errorHandler = (err: Error | string, res?: Response, status = 500, outputLog = true) => {
  if (outputLog) console.error(err);
  console.log(err);
  if (res) return res.status(status).json({ err });
  return jsonResponse(err);
};

export default errorHandler;
