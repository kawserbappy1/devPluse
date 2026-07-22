import type { NextFunction, Request, Response } from "express";

const catchAsync = (controller: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(controller(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

export default catchAsync;

// const catchAsync =
//   (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
//   };
// export default catchAsync;
