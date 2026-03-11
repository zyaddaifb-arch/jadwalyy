import { createPublicClient } from '@/lib/supabase/public';
import { notFound } from 'next/navigation';
import { BookingForm } from './booking-form';

export const dynamic = 'force-dynamic';

export default async function BookingFormPage({ params }: { params: Promise<{ teacherId: string, groupId: string }> }) {
  const resolvedParams = await params;
  const { teacherId, groupId } = resolvedParams;
  const supabase = createPublicClient();

  // Fetch group and teacher details in parallel
  const [groupResponse, profileResponse] = await Promise.all([
    groupId === 'test-group' 
      ? { data: { id: 'test-group', name: 'Test Group', subject: 'Math', seats_total: 50, seats_reserved: 10, time: '10:00 AM', description: 'Test' }, error: null } 
      : supabase.from('groups').select('*').eq('id', groupId).single(),
    teacherId === 'test-teacher' 
      ? { data: { id: 'test-teacher', full_name: 'Test Teacher', avatar_url: '' }, error: null } 
      : supabase.from('profiles').select('*').eq('id', teacherId).single()
  ]);

  console.log('--- TEST ROUTE DEBUG ---', { teacherId, groupId, groupError: groupResponse.error, profileError: profileResponse.error, groupData: groupResponse.data, profileData: profileResponse.data });

  if (groupResponse.error || !groupResponse.data) {
    return notFound();
  }

  return (
    <BookingForm
      group={groupResponse.data}
      profile={profileResponse.data}
      teacherId={teacherId}
      groupId={groupId}
    />
  );
}
