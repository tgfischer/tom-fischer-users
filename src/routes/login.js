const router = require("express").Router({ mergeParams: true });
const HttpStatus = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const middleware = require("tom-fischer-middleware");
const joi = require("tom-fischer-joi");

const UserService = require("../services/UserService");

const login = async (req, res) => {
  const { email, password } = res.locals.body;
  const userService = new UserService();

  const result = await userService.initiateAuth({ email, password });
  res.status(HttpStatus.OK).json(result);
};

const resetTemporaryPassword = async (req, res) => {
  const { email, password, session } = res.locals.body;
  const userService = new UserService();

  const result = await userService.resetTemporaryPassword({
    email,
    password,
    session
  });
  res.status(HttpStatus.OK).json(result);
};

router.post(
  "/",
  middleware.validate.body(joi.login.loginSchema),
  asyncHandler(login)
);

router.post(
  "/reset-temporary-password",
  middleware.validate.body(joi.login.resetTemporaryPasswordSchema),
  asyncHandler(resetTemporaryPassword)
);

module.exports = router;
