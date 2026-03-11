
const URL = "https://hmliayigwjoodyrtsbwf.supabase.co/rest/v1";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtbGlheWlnd2pvb2R5cnRzYndmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzAyMDE0MSwiZXhwIjoyMDg4NTk2MTQxfQ.n8imrg6Qg6oIHxHilhbt48G_q3-d5lqi5NVapt6EOLg";

async function verify() {
    console.log("Checking groups status...");
    const resGroups = await fetch(`${URL}/groups?select=status`, {
        headers: {
            "apikey": KEY,
            "Authorization": `Bearer ${KEY}`
        }
    });
    const groups = await resGroups.json();
    const groupStatuses = [...new Set(groups.map(g => g.status))];
    console.log("Distinct Group Statuses:", groupStatuses);

    console.log("Checking bookings status...");
    const resBookings = await fetch(`${URL}/bookings?select=status`, {
        headers: {
            "apikey": KEY,
            "Authorization": `Bearer ${KEY}`
        }
    });
    const bookings = await resBookings.json();
    const bookingStatuses = [...new Set(bookings.map(b => b.status))];
    console.log("Distinct Booking Statuses:", bookingStatuses);
}

verify().catch(console.error);
