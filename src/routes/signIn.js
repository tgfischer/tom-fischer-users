const router = require("express").Router({ mergeParams: true });
const HttpStatus = require("http-status-codes");
const middleware = require("tom-fischer-middleware");
const joi = require("tom-fischer-joi");

const signIn = (req, res) => res.status(HttpStatus.OK).json(res.locals.body);

router.post("/", middleware.validate.body(joi.signIn.signInSchema), signIn);

module.exports = router;
