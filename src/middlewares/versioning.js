const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const SUPPORTED_VERSIONS = ['1.0', '1.1'];
const DEFAULT_VERSION = '1.0';

/**
 * API versioning middleware
 * Supports versioning via:
 * 1. Accept header: Accept: application/vnd.epusara.v1+json
 * 2. Custom header: API-Version: 1.0
 * 3. Query parameter: ?version=1.0
 */
const apiVersioning = (req, res, next) => {
  let version = DEFAULT_VERSION;

  // Check Accept header
  const acceptHeader = req.get('Accept');
  if (acceptHeader && acceptHeader.includes('vnd.epusara.v')) {
    const versionMatch = acceptHeader.match(/vnd\.epusara\.v(\d+(?:\.\d+)?)/);
    if (versionMatch) {
      version = versionMatch[1];
    }
  }

  // Check API-Version header (overrides Accept header)
  const apiVersionHeader = req.get('API-Version');
  if (apiVersionHeader) {
    version = apiVersionHeader;
  }

  // Check query parameter (overrides headers)
  if (req.query.version) {
    version = req.query.version;
  }

  // Validate version
  if (!SUPPORTED_VERSIONS.includes(version)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Unsupported API version: ${version}. Supported versions: ${SUPPORTED_VERSIONS.join(', ')}`
    );
  }

  // Add version info to request and response
  req.apiVersion = version;
  res.set('API-Version', version);
  res.set('Supported-Versions', SUPPORTED_VERSIONS.join(', '));

  next();
};

/**
 * Version deprecation warning middleware
 */
const deprecationWarning = (deprecatedVersion, sunsetDate) => {
  return (req, res, next) => {
    if (req.apiVersion === deprecatedVersion) {
      res.set('Deprecation', 'true');
      res.set('Sunset', sunsetDate);
      res.set('Warning', `299 - "API version ${deprecatedVersion} is deprecated. Please upgrade to a newer version."`);
    }
    next();
  };
};

module.exports = {
  apiVersioning,
  deprecationWarning,
  SUPPORTED_VERSIONS,
  DEFAULT_VERSION
};