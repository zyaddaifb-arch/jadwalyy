
const fs = require('fs');

async function applyMigration() {
    const sql = fs.readFileSync('setup_storage.sql', 'utf8');
    const token = 'sbp_2dbf2440dc89bc1713ad7508ea8ce0508da334e4';
    const ref = 'hmliayigwjoodyrtsbwf';

    console.log("Pushing migration to Supabase...");
    const response = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: sql })
    });

    const responseText = await response.text();
    console.log("Response status:", response.status);
    console.log("Response body:", responseText);

    if (response.ok) {
        console.log("Migration applied successfully!");
    } else {
        console.error("Migration failed!");
        process.exit(1);
    }
}

applyMigration();
