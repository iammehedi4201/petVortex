/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { errorPreprossing } from "../../helper/errorHelper/errorPreprossing";
export type TErrorDetails = {
  issues: {
    field: string;
    message: string;
  }[];
};

export type TErrorResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  errorDetails: TErrorDetails | null;
};

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let errorResponse: TErrorResponse = {
    statusCode: err.statusCode || 500,
    success: false,
    message: err.message || "something went wrong",
    errorDetails: {
      issues: [
        {
          field: "",
          message: "something went wrong",
        },
      ],
    },
  };

  //error preprossing
  errorResponse = errorPreprossing(err) as TErrorResponse;

  //Ultimately we will send this errorReponse to the client
  return res.status(errorResponse.statusCode).json({
    success: errorResponse.success,
    message: errorResponse.message,
    errorDetails: errorResponse.errorDetails,
    err,
  });
};
