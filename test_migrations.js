const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
    'https://hmliayigwjoodyrtsbwf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtbGlheWlnd2pvb2R5cnRzYndmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzAyMDE0MSwiZXhwIjoyMDg4NTk2MTQxfQ.n8imrg6Qg6oIHxHilhbt48G_q3-d5lqi5NVapt6EOLg',
    { auth: { autoRefreshToken: false, persistSession: false } }
);

async function runTests() {
    console.log("Fetching bookings...");
    const { data: bookings } = await supabaseAdmin.from('bookings').select('*').limit(1);
    if (!bookings || bookings.length === 0) {
        console.log("No bookings found to test. Try booking via UI first or ensure we have one.");
        return;
    }

    const booking = bookings[0];
    console.log("Found booking:", booking.id, "Group:", booking.group_id);

    console.log("Attempting to duplicate booking for student phone...", booking.student_phone);
    const { error: duplicateError } = await supabaseAdmin.from('bookings').insert([{
        group_id: booking.group_id,
        student_name: 'Test Duplicate',
        student_phone: booking.student_phone,
        parent_phone: '123'
    }]);

    if (duplicateError) {
        console.log("Duplicate booking blocked successfully:", duplicateError.message);
    } else {
        console.log("WARNING: Duplicate booking was allowed!");
    }

    // Fetch current seats
    const { data: groupBefore } = await supabaseAdmin.from('groups').select('seats_reserved').eq('id', booking.group_id).single();
    console.log("Seats reserved before cancel:", groupBefore.seats_reserved);

    // Cancel booking
    console.log("Cancelling booking...");
    await supabaseAdmin.from('bookings').update({ status: 'ملغي' }).eq('id', booking.id);

    // Fetch updated seats
    const { data: groupAfter } = await supabaseAdmin.from('groups').select('seats_reserved').eq('id', booking.group_id).single();
    console.log("Seats reserved after cancel:", groupAfter.seats_reserved);

    // Re-activate to keep data roughly normal
    // await supabaseAdmin.from('bookings').update({ status: 'نشط' }).eq('id', booking.id);
    // Wait, activating it won't increment seats because the trigger is only on UPDATE if status changes from 'نشط' -> 'ملغي', not the other way.
    // We leave it cancelled or we delete it.
}

runTests();
