const Joi = require('joi');

const assignUserToSite = {
  body: Joi.object().keys({
    user_id: Joi.number().integer().required(),
    tapak_perkuburan_id: Joi.number().integer().required(),
  }),
};

const getUserSiteAssignments = {
  query: Joi.object().keys({
    user_id: Joi.number().integer(),
    tapak_perkuburan_id: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUserSiteAssignment = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
    siteId: Joi.number().integer().required(),
  }),
};

const removeUserFromSite = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
    siteId: Joi.number().integer().required(),
  }),
};

// NEW: Update validation
const updateUserSiteAssignment = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
    siteId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    tapak_perkuburan_id: Joi.number().integer().required(),
  }).min(1),
};

module.exports = {
  assignUserToSite,
  getUserSiteAssignments,
  updateUserSiteAssignment,
  getUserSiteAssignment,
  removeUserFromSite,
};