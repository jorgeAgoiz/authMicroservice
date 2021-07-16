import rateLimit from "express-rate-limit";

export const apiLimiter: rateLimit.RateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 120,
  message:
    "Too many accounts created from this IP, please try again after a ten minutes.",
});
