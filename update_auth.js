const fetch = require('node-fetch'); // we can just use native global fetch if Node >= 18

async function updateAuthConfig() {
    const token = 'sbp_2dbf2440dc89bc1713ad7508ea8ce0508da334e4';
    const ref = 'hmliayigwjoodyrtsbwf';

    try {
        const getRes = await fetch(`https://api.supabase.com/v1/projects/${ref}/config/auth`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const config = await getRes.json();
        console.log("Current config confirm_email:", config.mailer_autoconfirm);

        // Let's modify the auth config to disable email confirmation
        const updateRes = await fetch(`https://api.supabase.com/v1/projects/${ref}/config/auth`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mailer_autoconfirm: true, // true means autoconfirm emails, which bypasses the email sent
                sms_autoconfirm: true
            })
        });

        if (updateRes.ok) {
            console.log('Successfully disabled email confirmation.');
        } else {
            const err = await updateRes.text();
            console.log('Failed to disable email confirmation:', updateRes.status, err);
        }
    } catch (e) {
        console.error(e);
    }
}

updateAuthConfig();
