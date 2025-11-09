const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Get application statistics
 * @param {Object} filter
 * @returns {Promise<Object>}
 */
const getApplicationStats = async (filter = {}) => {
  const [total, submitted, approved, rejected, draft] = await Promise.all([
    prisma.permohonan.count({ where: filter }),
    prisma.permohonan.count({ where: { ...filter, status_permohonan: 'SUBMITTED' } }),
    prisma.permohonan.count({ where: { ...filter, status_permohonan: 'APPROVED' } }),
    prisma.permohonan.count({ where: { ...filter, status_permohonan: 'REJECTED' } }),
    prisma.permohonan.count({ where: { ...filter, status_permohonan: 'DRAF' } })
  ]);

  return {
    total,
    submitted,
    approved,
    rejected,
    draft
  };
};

/**
 * Get burial lot statistics
 * @param {Object} filter
 * @returns {Promise<Object>}
 */
const getBurialLotStats = async (filter = {}) => {
  const [total, available, occupied] = await Promise.all([
    prisma.lot_kubur.count({ where: filter }),
    prisma.lot_kubur.count({ where: { ...filter, kod_status_kubur: 'AV' } }),
    prisma.lot_kubur.count({ where: { ...filter, kod_status_kubur: 'OC' } })
  ]);

  return {
    total,
    available,
    occupied,
    occupancy_rate: total > 0 ? ((occupied / total) * 100).toFixed(2) : 0
  };
};

/**
 * Get payment statistics
 * @param {Object} filter
 * @returns {Promise<Object>}
 */
const getPaymentStats = async (filter = {}) => {
  const [total, paid, pending, cancelled] = await Promise.all([
    prisma.permohonan_bayaran.count({ where: filter }),
    prisma.permohonan_bayaran.count({ where: { ...filter, status_bayaran: 'PAID' } }),
    prisma.permohonan_bayaran.count({ where: { ...filter, status_bayaran: 'PENDING' } }),
    prisma.permohonan_bayaran.count({ where: { ...filter, status_bayaran: 'CANCELLED' } })
  ]);

  return {
    total,
    paid,
    pending,
    cancelled,
    payment_rate: total > 0 ? ((paid / total) * 100).toFixed(2) : 0
  };
};

/**
 * Get question statistics
 * @param {Object} filter
 * @returns {Promise<Object>}
 */
const getQuestionStats = async (filter = {}) => {
  const [total, answered, unanswered] = await Promise.all([
    prisma.pertanyaan.count({ where: filter }),
    prisma.pertanyaan.count({ where: { ...filter, status: 'A' } }),
    prisma.pertanyaan.count({ where: { ...filter, status: 'N' } })
  ]);

  return {
    total,
    answered,
    unanswered,
    response_rate: total > 0 ? ((answered / total) * 100).toFixed(2) : 0
  };
};

/**
 * Get applications by month
 * @param {number} year
 * @returns {Promise<Array>}
 */
const getApplicationsByMonth = async (year = new Date().getFullYear()) => {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year + 1, 0, 1);

  const applications = await prisma.permohonan.findMany({
    where: {
      created_at: {
        gte: startDate,
        lt: endDate
      }
    },
    select: {
      created_at: true,
      status_permohonan: true
    }
  });

  // Group by month
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    month_name: new Date(year, i).toLocaleString('default', { month: 'long' }),
    total: 0,
    approved: 0,
    rejected: 0
  }));

  applications.forEach(app => {
    const month = app.created_at.getMonth();
    monthlyData[month].total++;
    if (app.status_permohonan === 'APPROVED') monthlyData[month].approved++;
    if (app.status_permohonan === 'REJECTED') monthlyData[month].rejected++;
  });

  return monthlyData;
};

/**
 * Get cemetery site utilization
 * @returns {Promise<Array>}
 */
const getCemeterySiteUtilization = async () => {
  const sites = await prisma.tapak_perkuburan.findMany({
    include: {
      zon_tapak_perkuburan: {
        include: {
          lot_kubur: true
        }
      }
    }
  });

  return sites.map(site => {
    const totalLots = site.zon_tapak_perkuburan.reduce((sum, zone) => sum + zone.lot_kubur.length, 0);
    const occupiedLots = site.zon_tapak_perkuburan.reduce((sum, zone) => 
      sum + zone.lot_kubur.filter(lot => lot.kod_status_kubur === 'OC').length, 0
    );

    return {
      site_id: site.id,
      site_name: site.nama_tapak,
      total_lots: totalLots,
      occupied_lots: occupiedLots,
      available_lots: totalLots - occupiedLots,
      utilization_rate: totalLots > 0 ? ((occupiedLots / totalLots) * 100).toFixed(2) : 0
    };
  });
};

/**
 * Get top question categories
 * @param {number} limit
 * @returns {Promise<Array>}
 */
const getTopQuestionCategories = async (limit = 10) => {
  const categories = await prisma.pertanyaan.groupBy({
    by: ['kod_kategori_pertanyaan'],
    _count: {
      id: true
    },
    orderBy: {
      _count: {
        id: 'desc'
      }
    },
    take: limit
  });

  // Get category details
  const categoryDetails = await prisma.ref_kategori_pertanyaan.findMany({
    where: {
      kod_kategori_pertanyaan: {
        in: categories.map(c => c.kod_kategori_pertanyaan)
      }
    }
  });

  return categories.map(cat => {
    const detail = categoryDetails.find(d => d.kod_kategori_pertanyaan === cat.kod_kategori_pertanyaan);
    return {
      category_code: cat.kod_kategori_pertanyaan,
      category_name: detail?.label_ms || 'Unknown',
      question_count: cat._count.id
    };
  });
};

/**
 * Get dashboard summary
 * @returns {Promise<Object>}
 */
const getDashboardSummary = async () => {
  const [applicationStats, lotStats, paymentStats, questionStats] = await Promise.all([
    getApplicationStats(),
    getBurialLotStats(),
    getPaymentStats(),
    getQuestionStats()
  ]);

  return {
    applications: applicationStats,
    burial_lots: lotStats,
    payments: paymentStats,
    questions: questionStats,
    generated_at: new Date()
  };
};

/**
 * Get revenue report
 * @param {Object} filter
 * @returns {Promise<Object>}
 */
const getRevenueReport = async (filter = {}) => {
  // This would typically calculate revenue based on burial fees
  // For now, we'll return payment statistics as a proxy
  const paymentStats = await getPaymentStats(filter);
  
  return {
    total_payments: paymentStats.total,
    paid_payments: paymentStats.paid,
    pending_payments: paymentStats.pending,
    payment_rate: paymentStats.payment_rate,
    // In a real implementation, you would calculate actual revenue amounts
    estimated_revenue: paymentStats.paid * 1000, // Placeholder calculation
    pending_revenue: paymentStats.pending * 1000
  };
};

module.exports = {
  getApplicationStats,
  getBurialLotStats,
  getPaymentStats,
  getQuestionStats,
  getApplicationsByMonth,
  getCemeterySiteUtilization,
  getTopQuestionCategories,
  getDashboardSummary,
  getRevenueReport,
};