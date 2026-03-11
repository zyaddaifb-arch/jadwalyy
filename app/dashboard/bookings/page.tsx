import { createClient } from '@/lib/supabase/server';
import { BookingsClient } from './bookings-client';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function BookingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: groups } = await supabase
    .from('groups')
    .select(`id, name, subject, bookings (*)`)
    .eq('teacher_id', user.id);

  let initialBookings: any[] = [];
  if (groups) {
    initialBookings = groups.flatMap(group =>
      (group.bookings || []).map((booking: any) => ({
        ...booking,
        group_name: group.name,
        group_subject: group.subject,
      }))
    ).sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  return <BookingsClient initialBookings={initialBookings} userId={user.id} />;
}
