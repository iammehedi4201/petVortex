/* eslint-disable @typescript-eslint/no-explicit-any */
import handleZodError from "./handleZodErrror";
import AppError from "./appError";
import handleDuplicateError from "./handleDuplicateError";
import { ZodError } from "zod";
import JwtError from "./jwtError";
export const errorPreprossing = (err: any) => {
  //check if the error form zod
  if (err instanceof ZodError) {
    return handleZodError(err);
  } else if (err.code === "P2002") {
    return handleDuplicateError(err);
  } else if (err instanceof AppError) {
    return {
      statusCode: err.statusCode,
      success: false,
      message: "something went wrong",
      errorDetails: err.message,
    };
  } else if (err instanceof JwtError) {
    return {
      statusCode: err.statusCode,
      success: false,
      message: "Unauthorized Access",
      errorDetails: {
        status: err.statusCode,
        error: err.message,
      },
    };
  } else if (err instanceof Error) {
    return {
      statusCode: 500,
      success: false,
      message: "Something Went Wrong",
      errorDetails: err,
    };
  }
};
