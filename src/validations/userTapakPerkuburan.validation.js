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

module.exports = {
  assignUserToSite,
  getUserSiteAssignments,
  getUserSiteAssignment,
  removeUserFromSite,
};