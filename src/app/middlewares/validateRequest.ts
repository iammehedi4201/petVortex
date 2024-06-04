import { AnyZodObject } from "zod";
import catchAsync from "../../Shared/catchAynsc";

const ValidateRequest = (Schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    console.log("req.body", req.body);
    await Schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default ValidateRequest;
