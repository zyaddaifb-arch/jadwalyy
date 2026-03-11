const fs = require('fs');

async function runUpgradeSchema() {
    const sql = fs.readFileSync('upgrade_schema.sql', 'utf8');

    console.log("Running Upgrade SQL...");
    const response = await fetch('https://api.supabase.com/v1/projects/hmliayigwjoodyrtsbwf/database/query', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer sbp_2dbf2440dc89bc1713ad7508ea8ce0508da334e4',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: sql })
    });

    const responseText = await response.text();
    console.log("Response status:", response.status);
    console.log("Response body:", responseText);
}

runUpgradeSchema();
