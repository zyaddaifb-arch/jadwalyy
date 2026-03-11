const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'https://hmliayigwjoodyrtsbwf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtbGlheWlnd2pvb2R5cnRzYndmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzAyMDE0MSwiZXhwIjoyMDg4NTk2MTQxfQ.n8imrg6Qg6oIHxHilhbt48G_q3-d5lqi5NVapt6EOLg',
    { auth: { autoRefreshToken: false, persistSession: false } }
);

async function fixProfile() {
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) return console.error(listError);

    const testUser = users.users.find(u => u.email === 'testteacher01_jadwaly@gmail.com');
    if (!testUser) {
        console.log("No test user found, skipping...");
        return;
    }

    // Insert profile row
    const { error: profileError } = await supabase.from('profiles').upsert({
        id: testUser.id,
        full_name: 'Test Teacher 01',
        phone: '01011111111',
        subject: 'Math',
    });

    if (profileError) {
        console.error("Profile insertion error:", profileError.message);
    } else {
        console.log("Successfully seeded profile for teacher:", testUser.email);
    }
}

fixProfile();
