const httpStatus = require('http-status').default;
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs').promises;

const prisma = new PrismaClient();

/**
 * Upload document
 * @param {Object} file
 * @param {number} userId
 * @returns {Promise<Document>}
 */
const uploadDocument = async (file, userId) => {
  const fileUuid = uuidv4();
  const fileExtension = path.extname(file.originalname);
  const fileName = file.originalname;
  const filePath = `uploads/${fileUuid}${fileExtension}`;
  
  // Create attachment record
  const attachment = await prisma.attachment.create({
    data: {
      uuid: fileUuid,
      file_name: fileName,
      file_size: file.size,
      file_path: filePath,
      mime_type: file.mimetype,
      extension: fileExtension,
      uploaded_by: userId
    }
  });

  return attachment;
};

/**
 * Query for documents
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryDocuments = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'uploaded_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.attachment.count({ where: filter }),
    prisma.attachment.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        permohonan_dokumen: {
          include: {
            permohonan: true
          }
        }
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
 * Get document by id
 * @param {number} id
 * @returns {Promise<Document>}
 */
const getDocumentById = async (id) => {
  return prisma.attachment.findUnique({ 
    where: { id },
    include: {
      permohonan_dokumen: {
        include: {
          permohonan: true
        }
      }
    }
  });
};

/**
 * Get document by UUID
 * @param {string} uuid
 * @returns {Promise<Document>}
 */
const getDocumentByUuid = async (uuid) => {
  return prisma.attachment.findUnique({ 
    where: { uuid },
    include: {
      permohonan_dokumen: {
        include: {
          permohonan: true
        }
      }
    }
  });
};

/**
 * Attach document to application
 * @param {number} applicationId
 * @param {number} attachmentId
 * @param {string} documentType
 * @returns {Promise<ApplicationDocument>}
 */
const attachToApplication = async (applicationId, attachmentId, documentType) => {
  // Verify application exists
  const application = await prisma.permohonan.findUnique({
    where: { id: applicationId }
  });
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }

  // Verify attachment exists
  const attachment = await getDocumentById(attachmentId);
  if (!attachment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }

  return prisma.permohonan_dokumen.create({
    data: {
      permohonan_id: applicationId,
      attachment_id: attachmentId,
      jenis_dokumen: documentType
    },
    include: {
      attachment: true,
      permohonan: true
    }
  });
};

/**
 * Get documents by application
 * @param {number} applicationId
 * @returns {Promise<Array>}
 */
const getDocumentsByApplication = async (applicationId) => {
  return prisma.permohonan_dokumen.findMany({
    where: { permohonan_id: applicationId },
    include: {
      attachment: true
    }
  });
};

/**
 * Delete document by id
 * @param {number} documentId
 * @returns {Promise<Document>}
 */
const deleteDocumentById = async (documentId) => {
  const document = await getDocumentById(documentId);
  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }

  // Delete file from filesystem (optional - implement based on your storage strategy)
  try {
    await fs.unlink(document.file_path);
  } catch (error) {
    // File might not exist, continue with database deletion
  }

  return prisma.attachment.delete({ where: { id: documentId } });
};

module.exports = {
  uploadDocument,
  queryDocuments,
  getDocumentById,
  getDocumentByUuid,
  attachToApplication,
  getDocumentsByApplication,
  deleteDocumentById,
};