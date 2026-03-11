const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'https://hmliayigwjoodyrtsbwf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtbGlheWlnd2pvb2R5cnRzYndmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzAyMDE0MSwiZXhwIjoyMDg4NTk2MTQxfQ.n8imrg6Qg6oIHxHilhbt48G_q3-d5lqi5NVapt6EOLg',
    { auth: { autoRefreshToken: false, persistSession: false } }
);

async function autoConfirmUsers() {
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) return console.error(listError);

    for (const user of users.users) {
        if (!user.email_confirmed_at) {
            console.log("Confirming email for", user.email);
            await supabase.auth.admin.updateUserById(user.id, {
                email_confirm: true
            });
            console.log('Successfully confirmed user email:', user.email);
        }
    }
}

autoConfirmUsers();
