const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create user profile
 */
const createUserProfile = async (profileData) => {
  return prisma.user_profile.create({
    data: profileData,
    include: {
      users: true
    }
  });
};

/**
 * Query user profiles
 */
const queryUserProfiles = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.user_profile.count({ where: filter }),
    prisma.user_profile.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        users: true
      }
    }),
  ]);

  return { results, page, limit, totalResults };
};

/**
 * Get user profile by id
 */
const getUserProfileById = async (id) => {
  return prisma.user_profile.findUnique({
    where: { id },
    include: {
      users: true
    }
  });
};

/**
 * Get user profile by user id
 */
const getUserProfileByUserId = async (userId) => {
  return prisma.user_profile.findFirst({
    where: { user_id: userId },
    include: {
      users: true
    }
  });
};

/**
 * Update user profile
 */
const updateUserProfileById = async (id, updateData) => {
  const profile = await getUserProfileById(id);
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User profile not found');
  }
  return prisma.user_profile.update({
    where: { id },
    data: updateData
  });
};

/**
 * Delete user profile
 */
const deleteUserProfileById = async (id) => {
  const profile = await getUserProfileById(id);
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User profile not found');
  }
  return prisma.user_profile.delete({ where: { id } });
};

/**
 * Replace user profile (full update)
 */
const replaceUserProfileById = async (id, replaceData) => {
  const profile = await getUserProfileById(id);
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User profile not found');
  }
  return prisma.user_profile.update({
    where: { id },
    data: replaceData
  });
};

module.exports = {
  createUserProfile,
  queryUserProfiles,
  replaceUserProfileById,
  getUserProfileById,
  getUserProfileByUserId,
  updateUserProfileById,
  deleteUserProfileById,
};