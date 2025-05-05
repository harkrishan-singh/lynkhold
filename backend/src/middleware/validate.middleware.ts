import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

// Middleware factory that creates request validators using Zod schemas
// Validates body, query params and route params against the provided schema
export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse and validate all request data against the schema
      schema.parse({
        body: req.body, // Request payload
        query: req.query, // URL query parameters
        params: req.params, // Route parameters
      });
      next(); // Validation successful - proceed to route handler
    } catch (err: any) {
      // Return structured validation errors if validation fails
      res.status(400).json({
        message: "Input validation failed!",
        error: err.errors, // Zod validation error details
      });
    }
  };
