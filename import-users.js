const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');

const KEYCLOAK_URL = 'http://localhost:8080';
const REALM = 'LibraryRealm';
const ADMIN_USERNAME = 'admin'; // اليوزر اللي بتدخلي بيه لصفحة الكيكلوك السوداء
const ADMIN_PASSWORD = 'admin'; // الباسورد بتاع الكيكلوك

async function importUsers() {
    try {
        // الحصول على توكن الأدمن للوصول لـ API الخاص بـ Keycloak
        const authRes = await axios.post(`${KEYCLOAK_URL}/realms/master/protocol/openid-connect/token`,
            new URLSearchParams({
                grant_type: 'password',
                client_id: 'admin-cli',
                username: ADMIN_USERNAME,
                password: ADMIN_PASSWORD
            })
        );
        const token = authRes.data.access_token;

        // قراءة ملف الـ CSV اللي إنتي عملتيه
        fs.createReadStream('users.csv')
            .pipe(csv())
            .on('data', async(row) => {
                try {
                    await axios.post(`${KEYCLOAK_URL}/admin/realms/${REALM}/users`, {
                        username: row.Username,
                        email: row.Email,
                        enabled: true,
                        credentials: [{ type: 'password', value: row.Password, temporary: false }]
                    }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    console.log(`✅ User ${row.Username} imported successfully!`);
                } catch (err) {
                    console.log(`❌ Error importing ${row.Username}: ${err.response?.data?.errorMessage || err.message}`);
                }
            })
            .on('end', () => console.log('🏁 Finished! Check Keycloak Admin now.'));
    } catch (error) {
        console.error('Failed: Make sure Keycloak is running and Admin credentials are correct.');
    }
}
importUsers();