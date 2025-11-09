const httpStatus = require('http-status').default;
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Generate application number
 * @param {string} type
 * @returns {Promise<string>}
 */
const generateApplicationNumber = async (type) => {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  
  // Get or create running number for today
  let runningNumber = await prisma.permohonan_running_number.findFirst({
    where: { type, date: today }
  });
  
  if (!runningNumber) {
    runningNumber = await prisma.permohonan_running_number.create({
      data: { type, date: today, running_no: 1 }
    });
  } else {
    runningNumber = await prisma.permohonan_running_number.update({
      where: { id: runningNumber.id },
      data: { running_no: runningNumber.running_no + 1 }
    });
  }
  
  return `${type}${dateStr.replace(/-/g, '')}${String(runningNumber.running_no).padStart(4, '0')}`;
};

/**
 * Create an application
 * @param {Object} applicationBody
 * @returns {Promise<Application>}
 */
const createApplication = async (applicationBody) => {
  const { applicant, deceased, ...appData } = applicationBody;
  
  // Get ref_kategori_jenazah_id from root or deceased object
  const refKategoriJenazahId = appData.ref_kategori_jenazah_id || (deceased && deceased.ref_kategori_jenazah_id);
  
  if (!refKategoriJenazahId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'ref_kategori_jenazah_id is required');
  }
  
  // Generate application number
  const applicationNumber = await generateApplicationNumber(appData.kod_jenis_permohonan);
  
  // Create application with related data
  const application = await prisma.permohonan.create({
    data: {
      ...appData,
      ref_kategori_jenazah_id: refKategoriJenazahId,
      no_permohonan: applicationNumber,
      status_permohonan: 'DRAFT',
      permohonan_pemohon: applicant ? {
        create: applicant
      } : undefined,
      permohonan_jenazah: deceased ? {
        create: deceased
      } : undefined
    },
    include: {
      permohonan_pemohon: true,
      permohonan_jenazah: true,
      ref_jenis_permohonan: true
    }
  });
  
  return application;
};

/**
 * Query for applications
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryApplications = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.permohonan.count({ where: filter }),
    prisma.permohonan.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        permohonan_pemohon: true,
        permohonan_jenazah: true,
        permohonan_bayaran: true,
        permohonan_dokumen: true,
        ref_jenis_permohonan: true
      }
    }),
  ]);

  return {
    results,
    page,
    limit,
    totalResults,
  };
};

/**
 * Get application by id
 * @param {number} id
 * @returns {Promise<Application>}
 */
const getApplicationById = async (id) => {
  return prisma.permohonan.findUnique({ 
    where: { id },
    include: {
      permohonan_pemohon: true,
      permohonan_jenazah: true,
      permohonan_bayaran: true,
      permohonan_dokumen: {
        include: {
          attachment: true
        }
      },
      permohonan_notes: true,
      ref_jenis_permohonan: true
    }
  });
};

/**
 * Update application by id
 * @param {number} applicationId
 * @param {Object} updateBody
 * @returns {Promise<Application>}
 */
const updateApplicationById = async (applicationId, updateBody) => {
  const application = await getApplicationById(applicationId);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }

  return prisma.permohonan.update({
    where: { id: applicationId },
    data: updateBody,
  });
};

/**
 * Submit application
 * @param {number} applicationId
 * @returns {Promise<Application>}
 */
const submitApplication = async (applicationId) => {
  const application = await getApplicationById(applicationId);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }
  
  if (application.status_permohonan !== 'DRAFT') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only draft applications can be submitted');
  }

  return prisma.permohonan.update({
    where: { id: applicationId },
    data: { status_permohonan: 'IN_PROGRESS' },
  });
};

/**
 * Approve application
 * @param {number} applicationId
 * @param {string} notes
 * @returns {Promise<Application>}
 */
const approveApplication = async (applicationId, notes) => {
  const application = await getApplicationById(applicationId);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }

  const updatedApp = await prisma.permohonan.update({
    where: { id: applicationId },
    data: { status_permohonan: 'APPROVED' },
  });

  if (notes) {
    await prisma.permohonan_notes.create({
      data: {
        permohonan_id: applicationId,
        type: 'APPROVAL',
        notes: notes
      }
    });
  }

  return updatedApp;
};

/**
 * Reject application
 * @param {number} applicationId
 * @param {string} notes
 * @returns {Promise<Application>}
 */
const rejectApplication = async (applicationId, notes) => {
  const application = await getApplicationById(applicationId);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }

  const updatedApp = await prisma.permohonan.update({
    where: { id: applicationId },
    data: { status_permohonan: 'REJECTED' },
  });

  if (notes) {
    await prisma.permohonan_notes.create({
      data: {
        permohonan_id: applicationId,
        type: 'REJECTION',
        notes: notes
      }
    });
  }

  return updatedApp;
};

/**
 * Delete application by id
 * @param {number} applicationId
 * @returns {Promise<Application>}
 */
const deleteApplicationById = async (applicationId) => {
  const application = await getApplicationById(applicationId);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }
  return prisma.permohonan.delete({ where: { id: applicationId } });
};

module.exports = {
  createApplication,
  queryApplications,
  getApplicationById,
  updateApplicationById,
  submitApplication,
  approveApplication,
  rejectApplication,
  deleteApplicationById,
};