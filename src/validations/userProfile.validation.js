const Joi = require('joi');

const createUserProfile = {
  body: Joi.object().keys({
    user_id: Joi.number().integer().required(),
    full_name: Joi.string(),
    phone_no: Joi.string().max(15),
    email: Joi.string().email(),
    gender: Joi.string().valid('male', 'female', 'other'),
    jenis_pengenalan: Joi.string().valid('NRIC', 'PASSPORT'),
    no_pengenalan: Joi.string().max(12),
    address1: Joi.string().max(300),
    address2: Joi.string().max(300),
    address3: Joi.string().max(300),
    poskod: Joi.string().max(5),
    bandar: Joi.string().max(100),
    daerah: Joi.string().max(100),
    negeri: Joi.string().max(100),
  }),
};

const queryUserProfiles = {
  query: Joi.object().keys({
    user_id: Joi.number().integer(),
    gender: Joi.string().valid('male', 'female', 'other'),
    jenis_pengenalan: Joi.string().valid('NRIC', 'PASSPORT'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUserProfile = {
  params: Joi.object().keys({
    profileId: Joi.number().integer().required(),
  }),
};

const getUserProfileByUserId = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
};

const updateUserProfile = {
  params: Joi.object().keys({
    profileId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    full_name: Joi.string(),
    phone_no: Joi.string().max(15),
    email: Joi.string().email(),
    gender: Joi.string().valid('male', 'female', 'other'),
    jenis_pengenalan: Joi.string().valid('NRIC', 'PASSPORT'),
    no_pengenalan: Joi.string().max(12),
    address1: Joi.string().max(300),
    address2: Joi.string().max(300),
    address3: Joi.string().max(300),
    poskod: Joi.string().max(5),
    bandar: Joi.string().max(100),
    daerah: Joi.string().max(100),
    negeri: Joi.string().max(100),
  }),
};

const deleteUserProfile = {
  params: Joi.object().keys({
    profileId: Joi.number().integer().required(),
  }),
};

const replaceUserProfile = {
  params: Joi.object().keys({
    profileId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    full_name: Joi.string().required(),
    phone_no: Joi.string().max(15).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    jenis_pengenalan: Joi.string().valid('NRIC', 'PASSPORT').required(),
    no_pengenalan: Joi.string().max(12).required(),
    address1: Joi.string().max(300).required(),
    address2: Joi.string().max(300),
    address3: Joi.string().max(300),
    poskod: Joi.string().max(5).required(),
    bandar: Joi.string().max(100).required(),
    daerah: Joi.string().max(100).required(),
    negeri: Joi.string().max(100).required(),
  }),
};

module.exports = {
  createUserProfile,
  queryUserProfiles,
  getUserProfile,
  replaceUserProfile,
  getUserProfileByUserId,
  updateUserProfile,
  deleteUserProfile,
};