# Epusara Backend API Documentation

## OpenAPI Documentation

### Access Swagger UI
```
http://localhost:3000/v1/docs
```

### Download OpenAPI Specification
```bash
# JSON format
curl http://localhost:3000/v1/docs/swagger.json -o openapi-spec.json

# Or use npm script
npm run download-spec
```

## Generate Client SDKs

### Prerequisites
```bash
npm install -g @openapitools/openapi-generator-cli
```

### Generate All Clients
```bash
npm run generate-clients
```

### Manual Generation
```bash
# JavaScript/Node.js client
openapi-generator-cli generate -i http://localhost:3000/v1/docs/swagger.json -g javascript -o ./clients/javascript

# TypeScript client
openapi-generator-cli generate -i http://localhost:3000/v1/docs/swagger.json -g typescript-axios -o ./clients/typescript

# Python client
openapi-generator-cli generate -i http://localhost:3000/v1/docs/swagger.json -g python -o ./clients/python
```

## Available APIs

### Core APIs
- **Permohonan** - `/permohonan` - Burial applications
- **TapakPerkuburan** - `/tapak-perkuburan` - Cemetery sites
- **ZonTapakPerkuburan** - `/zon-tapak-perkuburan` - Cemetery zones
- **LotKubur** - `/lot-kubur` - Burial lots
- **UserTapakPerkuburan** - `/user-tapak-perkuburan` - User site assignments

### Reference Tables
- **RefNegara** - `/ref_negara` - Countries
- **RefNegeri** - `/ref_negeri` - States
- **RefStatusKubur** - `/ref_status_kubur` - Grave statuses
- **RefKategoriJenazah** - `/ref_kategori_jenazah` - Corpse categories
- **RefJenisPermohonan** - `/ref_jenis_permohonan` - Application types
- **RefBangsa** - `/ref_bangsa` - Ethnicities
- **RefHubungan** - `/ref_hubungan` - Relationships
- **RefJenisHaiwan** - `/ref_jenis_haiwan` - Animal types
- **RefBahagianBadan** - `/ref_bahagian_badan` - Body parts
- **RefEmailTemplate** - `/ref_email_template` - Email templates
- **RefPaparanPengumuman** - `/ref_paparan_pengumuman` - Announcements
- **RefKategoriPertanyaan** - `/ref_kategori_pertanyaan` - Question categories

### System APIs
- **Auth** - `/auth` - Authentication
- **Users** - `/users` - User management
- **Roles** - `/roles` - Role management
- **Permissions** - `/permission` - Permission management
- **Pertanyaan** - `/pertanyaan` - Questions/Inquiries
- **PertanyaanFaq** - `/pertanyaan_faq` - FAQ management

## Usage Examples

### JavaScript/Node.js
```javascript
const EpusaraApi = require('./generated-clients/javascript');
const api = new EpusaraApi.DefaultApi();

// Get all cemetery sites
api.getTapakPerkuburans().then(result => {
  console.log(result);
});
```

### TypeScript
```typescript
import { DefaultApi } from './generated-clients/typescript-axios';
const api = new DefaultApi();

// Get burial applications
const applications = await api.getPermohonans();
```

### Python
```python
import epusara_api
from epusara_api.rest import ApiException

api = epusara_api.DefaultApi()

try:
    # Get reference countries
    countries = api.get_ref_negaras()
    print(countries)
except ApiException as e:
    print(f"Exception: {e}")
```