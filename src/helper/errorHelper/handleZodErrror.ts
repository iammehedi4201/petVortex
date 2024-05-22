import { ZodError, ZodIssue } from "zod";
import {
  TErrorDetails,
  TErrorResponse,
} from "../../app/middlewares/globalErrorHandlers";

const handleZodError = (err: ZodError): TErrorResponse => {
  //error source
  const errorDetails: TErrorDetails = {
    issues: err.issues.map((issue: ZodIssue) => {
      return {
        field: issue.path.pop() as string,
        message: `${issue.path.pop()} field is  ${issue?.message}`,
      };
    }),
  };
  //error details
  const message = errorDetails.issues
    .map((error) => `${error.message}`)
    .join(" . ");
  return {
    statusCode: 400,
    success: false,
    message,
    errorDetails: errorDetails,
  };
};

export default handleZodError;
