
const token = 'sbp_2dbf2440dc89bc1713ad7508ea8ce0508da334e4';
const ref = 'hmliayigwjoodyrtsbwf';

async function checkBuckets() {
    console.log("Checking storage buckets...");
    const response = await fetch(`https://api.supabase.com/v1/projects/${ref}/storage/buckets`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const buckets = await response.json();
        console.log("Existing buckets:", buckets.map(b => b.name));
    } else {
        const err = await response.text();
        console.error("Failed to fetch buckets:", response.status, err);
    }
}

checkBuckets();
