const httpStatus = require('http-status').default;
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const tokenService = require('./token.service');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

const prisma = new PrismaClient();

/**
 * Login with IC/passport number and password
 * @param {string} no_pengenalan
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithIcAndPassword = async (no_pengenalan, password) => {
  // Find user by IC/passport number from user_profile table
  const userProfile = await prisma.user_profile.findFirst({
    where: { no_pengenalan },
    include: { users: true }
  });
  
  if (!userProfile || !userProfile.users) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect IC/passport number or password');
  }
  
  const user = userProfile.users;
  
  //bro why tf this library doesn't support 2y$
  let hash = user.password;
  if (hash.startsWith('$2y$')) {
    hash = hash.replace(/^\$2y\$/, '$2a$');
  }
  
  if (!(await bcrypt.compare(password, hash))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect IC/passport number or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const tokenRecord = await prisma.refresh_token.findFirst({
    where: {
      token:      refreshToken,
      is_revoked: false,
    },
  });
  if (!tokenRecord) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Refresh token not found');
  }

  await prisma.refresh_token.delete({
    where: { id: tokenRecord.id },
  });
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

module.exports = {
  loginUserWithIcAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
