const fs = require('fs');
const path = require('path');

const routesDir = './src/routes/v1';

// List of route files to process
const routeFiles = [
  'role.route.js',
  'cemeterySite.route.js', 
  'cemeteryZone.route.js',
  'burialLot.route.js',
  'permission.route.js',
  'question.route.js',
  'menu.route.js',
  'errorLog.route.js',
  'userProfile.route.js',
  'passwordHistory.route.js',
  'passwordReset.route.js',
  'userToken.route.js',
  'refreshToken.route.js',
  'userTapakPerkuburan.route.js',
  'permohonanDetail.route.js',
  'permohonanRunningNumber.route.js',
  'userRole.route.js',
  'emailQueue.route.js',
  'roleMenu.route.js',
  'rolePermission.route.js',
  'permohonanAnggotaBadan.route.js',
  'permohonanBayaran.route.js',
  'permohonanDokumen.route.js',
  'permohonanHaiwan.route.js',
  'permohonanJenazah.route.js',
  'permohonanNotes.route.js',
  'permohonanPemohon.route.js',
  'auditEvent.route.js',
  'auditLog.route.js',
  'emailTemplate.route.js',
  'refEmailTemplate.route.js',
  'refBahagianBadan.route.js',
  'refBangsa.route.js',
  'refHubungan.route.js',
  'refJenisHaiwan.route.js',
  'refJenisPermohonan.route.js',
  'refKategoriJenazah.route.js',
  'refKategoriPertanyaan.route.js',
  'refNegara.route.js',
  'refNegeri.route.js',
  'refPoskod.route.js',
  'refStatusKubur.route.js',
  'pertanyaanFaq.route.js'
];

function disableAuthInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace auth() with commented version
    content = content.replace(/auth\(\)/g, '/*auth()*/');
    
    // Add comment for easy re-enabling
    content = content.replace(/\/\*auth\(\)\*\//g, '/*auth()*/ // UNCOMMENT: auth(),');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Disabled auth in: ${filePath}`);
  } catch (error) {
    console.log(`❌ Error processing ${filePath}:`, error.message);
  }
}

console.log('🔓 Disabling authentication in all route files...\n');

routeFiles.forEach(file => {
  const filePath = path.join(routesDir, file);
  if (fs.existsSync(filePath)) {
    disableAuthInFile(filePath);
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log('\n✅ Authentication disabled in all route files!');
console.log('💡 To re-enable auth: Remove /*auth()*/ comments and // UNCOMMENT: auth(), lines');