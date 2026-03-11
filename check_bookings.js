const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
    'https://hmliayigwjoodyrtsbwf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtbGlheWlnd2pvb2R5cnRzYndmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzAyMDE0MSwiZXhwIjoyMDg4NTk2MTQxfQ.n8imrg6Qg6oIHxHilhbt48G_q3-d5lqi5NVapt6EOLg',
    { auth: { autoRefreshToken: false, persistSession: false } }
);

async function check() {
    const { data, error } = await supabaseAdmin.from('bookings').select('*');
    console.log("Bookings:", data);
    if (error) console.error(error);
}

check();
