const axios = require('axios');
const xlsx = require('xlsx');

// إعدادات الدخول لـ Keycloak
const KEYCLOAK_URL = 'http://localhost:8080';
const REALM = 'LibraryRealm';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin';

async function importUsers() {
    try {
        // 1. الحصول على Token للإدمن
        const authResponse = await axios.post(`${KEYCLOAK_URL}/realms/master/protocol/openid-connect/token`,
            new URLSearchParams({
                grant_type: 'password',
                client_id: 'admin-cli',
                username: ADMIN_USER,
                password: ADMIN_PASS
            })
        );
        const token = authResponse.data.access_token;

        // 2. قراءة ملف الـ Excel
        const workbook = xlsx.readFile('./users.xlsx');
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const users = xlsx.utils.sheet_to_json(sheet);

        console.log(`Found ${users.length} users to import...`);

        for (const user of users) {
            // 3. إنشاء المستخدم في Keycloak
            const userPayload = {
                username: user.Username,
                email: user.Email,
                enabled: true,
                credentials: [{ type: 'password', value: user.Password, temporary: false }]
            };

            await axios.post(`${KEYCLOAK_URL}/admin/realms/${REALM}/users`, userPayload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(`Successfully imported: ${user.Username}`);
        }
    } catch (error) {
        console.error('Error importing users:', error.response ? error.response.data : error.message);
    }
}

importUsers();