"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncWrapper = void 0;
const asyncWrapper = fn => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error.message);
    }
  };
};
exports.asyncWrapper = asyncWrapper;