const { readToken } = require("../helper/jwt");
const { User } = require("../models/");

async function authentication(req, res, next) {
  try {
    const { accesstoken } = req.headers;
    //Cek token valid atau tidak
    const payload = readToken(accesstoken);

    const userTrue = await User.findOne({
      where: {
        id: payload.id,
        email: payload.email,
      },
    });
    if (!userTrue) {
      throw "TokenError";
    }

    req.accessedUser = {
      id: userTrue.id,
      email: userTrue.email,
      name: userTrue.username,
    };
    next();
  } catch (error) {
    next(error);
  }
}

async function authorization(req, res, next) {
  const { id } = req.params;
  try {
    const userAccessed = await User.findOne({
      where: {
        id: req.accessedUser.id,
        email: req.accessedUser.email,
      },
    });
    if (!userAccessed) {
      throw "TokenError";
    }
    if (userAccessed.role !== "admin") {
      throw "Forbidden";
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
  authorization,
};