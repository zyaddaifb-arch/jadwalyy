const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'https://hmliayigwjoodyrtsbwf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtbGlheWlnd2pvb2R5cnRzYndmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzAyMDE0MSwiZXhwIjoyMDg4NTk2MTQxfQ.n8imrg6Qg6oIHxHilhbt48G_q3-d5lqi5NVapt6EOLg',
    { auth: { autoRefreshToken: false, persistSession: false } }
);

async function checkTables() {
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    if (error) {
        console.error("Error querying profiles:", error);
    } else {
        console.log("Profiles table exists! Data:", data);
    }

    const { data: gData, error: gError } = await supabase.from('groups').select('*').limit(1);
    if (gError) {
        console.error("Error querying groups:", gError);
    } else {
        console.log("Groups table exists! Data:", gData);
    }
}

checkTables();
