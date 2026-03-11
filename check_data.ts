
import { createClient } from './lib/supabase/client';

async function checkStatusValues() {
    const supabase = createClient();

    const { data: groups, error: groupsError } = await supabase
        .from('groups')
        .select('status');

    if (groupsError) {
        console.error('Groups error:', groupsError);
    } else {
        const statuses = [...new Set(groups.map(g => g.status))];
        console.log('Groups statuses:', statuses);
    }

    const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('status');

    if (bookingsError) {
        console.error('Bookings error:', bookingsError);
    } else {
        const statuses = [...new Set(bookings.map(b => b.status))];
        console.log('Bookings statuses:', statuses);
    }
}

checkStatusValues();
