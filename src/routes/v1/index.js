const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/roles',
    route: require('./role.route'),
  },

  {
    path: '/permohonan',
    route: require('./permohonan.route'),
  },
  {
    path: '/permission',
    route: require('./permission.route'),
  },
  {
    path: '/permissions',
    route: require('./permission.route'),
  },
  {
    path: '/pertanyaan',
    route: require('./pertanyaan.route'),
  },
  {
    path: '/menu',
    route: require('./menu.route'),
  },
  {
    path: '/menus',
    route: require('./menu.route'),
  },
  {
    path: '/error-logs',
    route: require('./errorLog.route'),
  },
  {
    path: '/user_profile',
    route: require('./userProfile.route'),
  },
  {
    path: '/user-profiles',
    route: require('./userProfile.route'),
  },
  {
    path: '/password_history',
    route: require('./passwordHistory.route'),
  },
  {
    path: '/password-history',
    route: require('./passwordHistory.route'),
  },
  {
    path: '/password_resets',
    route: require('./passwordReset.route'),
  },
  {
    path: '/user_tokens',
    route: require('./userToken.route'),
  },
  {
    path: '/refresh_token',
    route: require('./refreshToken.route'),
  },
  {
    path: '/refresh-tokens',
    route: require('./refreshToken.route'),
  },
  {
    path: '/user-tapak-perkuburan',
    route: require('./userTapakPerkuburan.route'),
  },
  {
    path: '/lot-kubur',
    route: require('./lotKubur.route'),
  },
  {
    path: '/zon-tapak-perkuburan',
    route: require('./zonTapakPerkuburan.route'),
  },
  {
    path: '/tapak-perkuburan',
    route: require('./tapakPerkuburan.route'),
  },
  {
    path: '/permohonan_detail',
    route: require('./permohonanDetail.route'),
  },
  {
    path: '/application-details',
    route: require('./permohonanDetail.route'),
  },
  {
    path: '/permohonan_running_number',
    route: require('./permohonanRunningNumber.route'),
  },
  {
    path: '/application-running-numbers',
    route: require('./permohonanRunningNumber.route'),
  },
  {
    path: '/running-numbers',
    route: require('./permohonanRunningNumber.route'),
  },
  {
    path: '/user_role',
    route: require('./userRole.route'),
  },
  {
    path: '/email-queue',
    route: require('./emailQueue.route'),
  },
  {
    path: '/role_menu',
    route: require('./roleMenu.route'),
  },
  {
    path: '/role-menus',
    route: require('./roleMenu.route'),
  },
  {
    path: '/role-menu',
    route: require('./roleMenu.route'),
  },
  {
    path: '/role_permission',
    route: require('./rolePermission.route'),
  },
  {
    path: '/role-permissions',
    route: require('./rolePermission.route'),
  },
  {
    path: '/role-permission',
    route: require('./rolePermission.route'),
  },
  {
    path: '/attachments',
    route: require('./attachment.route'),
  },
  {
    path: '/permohonan_anggota_badan',
    route: require('./permohonanAnggotaBadan.route'),
  },
  {
    path: '/permohonan_bayaran',
    route: require('./permohonanBayaran.route'),
  },
  {
    path: '/application-payments',
    route: require('./permohonanBayaran.route'),
  },
  {
    path: '/permohonan_dokumen',
    route: require('./permohonanDokumen.route'),
  },
  {
    path: '/application-documents',
    route: require('./permohonanDokumen.route'),
  },
  {
    path: '/permohonan_haiwan',
    route: require('./permohonanHaiwan.route'),
  },
  {
    path: '/application-animals',
    route: require('./permohonanHaiwan.route'),
  },
  {
    path: '/permohonan_jenazah',
    route: require('./permohonanJenazah.route'),
  },
  {
    path: '/application-deceased',
    route: require('./permohonanJenazah.route'),
  },
  {
    path: '/permohonan_notes',
    route: require('./permohonanNotes.route'),
  },
  {
    path: '/application-notes',
    route: require('./permohonanNotes.route'),
  },
  {
    path: '/permohonan_pemohon',
    route: require('./permohonanPemohon.route'),
  },
  {
    path: '/application-applicants',
    route: require('./permohonanPemohon.route'),
  },
  {
    path: '/audit-events',
    route: require('./auditEvent.route'),
  },
  {
    path: '/audit-logs',
    route: require('./auditLog.route'),
  },
  {
    path: '/email-templates',
    route: require('./emailTemplate.route'),
  },
  {
    path: '/ref_email_template',
    route: require('./refEmailTemplate.route'),
  },
  {
    path: '/ref_bahagian_badan',
    route: require('./refBahagianBadan.route'),
  },
  {
    path: '/ref_bangsa',
    route: require('./refBangsa.route'),
  },
  {
    path: '/ref_hubungan',
    route: require('./refHubungan.route'),
  },
  {
    path: '/ref_jenis_haiwan',
    route: require('./refJenisHaiwan.route'),
  },
  {
    path: '/ref_jenis_permohonan',
    route: require('./refJenisPermohonan.route'),
  },
  {
    path: '/ref_kategori_jenazah',
    route: require('./refKategoriJenazah.route'),
  },
  {
    path: '/ref_kategori_pertanyaan',
    route: require('./refKategoriPertanyaan.route'),
  },
  {
    path: '/ref_negara',
    route: require('./refNegara.route'),
  },
  {
    path: '/ref_negeri',
    route: require('./refNegeri.route'),
  },
  {
    path: '/ref_paparan_pengumuman',
    route: require('./refPaparanPengumuman.route'),
  },
  {
    path: '/ref-postal-codes',
    route: require('./refPoskod.route'),
  },
  {
    path: '/ref_status_kubur',
    route: require('./refStatusKubur.route'),
  },
  {
    path: '/pertanyaan_faq',
    route: require('./pertanyaan_faq.route'),
  },
  {
    path: '/application-body-parts',
    route: require('./refBahagianBadan.route'),
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
