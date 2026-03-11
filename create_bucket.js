
const token = 'sbp_2dbf2440dc89bc1713ad7508ea8ce0508da334e4';
const ref = 'hmliayigwjoodyrtsbwf';

async function createAvatarsBucket() {
    console.log("Creating 'avatars' bucket...");
    const response = await fetch(`https://api.supabase.com/v1/projects/${ref}/storage/buckets`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: 'avatars',
            name: 'avatars',
            public: true,
            file_size_limit: 5242880, // 5MB
            allowed_mime_types: ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
        })
    });

    const result = await response.text();
    console.log("Status:", response.status);
    console.log("Result:", result);
}

createAvatarsBucket();
