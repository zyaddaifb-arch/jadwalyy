
const token = 'sbp_2dbf2440dc89bc1713ad7508ea8ce0508da334e4';
const ref = 'hmliayigwjoodyrtsbwf';

async function runQuery(sql) {
    const response = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: sql })
    });
    return await response.json();
}

async function verify() {
    console.log("Verifying migration...");

    // 1. Check ENUM types
    const enumCheck = await runQuery(`
        SELECT t.typname FROM pg_type t 
        JOIN pg_namespace n ON n.oid = t.typnamespace 
        WHERE t.typname IN ('group_status', 'booking_status') AND n.nspname = 'public';
    `);
    console.log("ENUM Types found:", enumCheck.map(r => r.typname));

    // 2. Check Column Types
    const colCheck = await runQuery(`
        SELECT table_name, column_name, udt_name 
        FROM information_schema.columns 
        WHERE table_name IN ('groups', 'bookings') AND column_name = 'status' AND table_schema = 'public';
    `);
    console.log("Column Types:", colCheck);

    // 3. Check Indexes
    const indexCheck = await runQuery(`
        SELECT indexname FROM pg_indexes 
        WHERE tablename IN ('groups', 'bookings') AND schemaname = 'public';
    `);
    const indexNames = indexCheck.map(r => r.indexname);
    console.log("Indexes found:", indexNames);

    const requiredIndexes = [
        'unique_active_booking_per_student',
        'idx_groups_teacher_id',
        'idx_groups_status',
        'idx_bookings_group_id'
    ];
    requiredIndexes.forEach(idx => {
        if (indexNames.includes(idx)) {
            console.log(`✅ Index ${idx} exists.`);
        } else {
            console.error(`❌ Index ${idx} MISSING!`);
        }
    });

    // 4. Test Triggers: Insertion
    console.log("Testing booking insertion trigger...");
    // First find a group
    const groups = await runQuery(`SELECT id, seats_reserved FROM groups WHERE status = 'نشط' LIMIT 1;`);
    if (groups.length === 0) {
        console.error("No active groups found to test triggers.");
    } else {
        const group = groups[0];
        const initialReserved = group.seats_reserved;
        console.log(`Initial reserved seats: ${initialReserved}`);

        const testPhone = '0123456789' + Math.floor(Math.random() * 1000);
        const insertRes = await runQuery(`
            INSERT INTO bookings (group_id, student_name, student_phone, parent_phone, status)
            VALUES ('${group.id}', 'Test Student', '${testPhone}', '0987654321', 'نشط')
            RETURNING id;
        `);

        if (insertRes.length > 0) {
            const bookingId = insertRes[0].id;
            console.log("✅ Booking inserted successfully.");

            const groupAfter = await runQuery(`SELECT seats_reserved FROM groups WHERE id = '${group.id}';`);
            console.log(`Reserved seats after insert: ${groupAfter[0].seats_reserved}`);
            if (groupAfter[0].seats_reserved === initialReserved + 1) {
                console.log("✅ Trigger incremented seats_reserved correctly.");
            } else {
                console.error("❌ Trigger FAILED to increment seats_reserved!");
            }

            // Test unique index
            console.log("Testing unique index...");
            const dupRes = await runQuery(`
                INSERT INTO bookings (group_id, student_name, student_phone, parent_phone, status)
                VALUES ('${group.id}', 'Dup Student', '${testPhone}', '0987654321', 'نشط');
            `);
            if (dupRes.message && dupRes.message.includes('unique_active_booking_per_student')) {
                console.log("✅ Unique index blocked duplicate booking correctly.");
            } else {
                console.error("❌ Unique index FAILED to block duplicate!");
                console.log("Response:", dupRes);
            }

            // Test Cancellation trigger
            console.log("Testing booking cancellation trigger...");
            await runQuery(`UPDATE bookings SET status = 'ملغي' WHERE id = '${bookingId}';`);
            const groupAfterCancel = await runQuery(`SELECT seats_reserved FROM groups WHERE id = '${group.id}';`);
            console.log(`Reserved seats after cancel: ${groupAfterCancel[0].seats_reserved}`);
            if (groupAfterCancel[0].seats_reserved === initialReserved) {
                console.log("✅ Trigger decremented seats_reserved correctly after cancellation.");
            } else {
                console.error("❌ Trigger FAILED to decrement seats_reserved after cancellation!");
            }

            // Cleanup
            await runQuery(`DELETE FROM bookings WHERE id = '${bookingId}';`);
            console.log("Test booking cleaned up.");
        } else {
            console.error("❌ Booking insertion failed!", insertRes);
        }
    }
}

verify().catch(console.error);
