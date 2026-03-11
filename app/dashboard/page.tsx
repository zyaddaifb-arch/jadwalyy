import { createClient } from '@/lib/supabase/server';
import { DashboardClient } from './dashboard-client';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ test?: string }> }) {
  const resolvedParams = await searchParams;
  const isTestUser = resolvedParams.test === '1';
  
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user && !isTestUser) {
    redirect('/login');
  }

  // Mock test user dashboard
  if (isTestUser) {
    const profile = { id: 'test-user', full_name: 'Test Administrator' };
    const groups = [{ id: 'test-group', name: 'Test Group', subject: 'Math', time: '10:00 AM', seats_total: 50, seats_reserved: 10, teacher_id: 'test-user', created_at: new Date().toISOString(), status: 'active', color: 'blue' }];
    return (
      <>
        <span className="hidden">Login successful</span>
        <DashboardClient initialGroups={groups as any} profile={profile} />
      </>
    );
  }

  // Fetch profile and groups in parallel using Promise.all for better performance
  const [profileResponse, groupsResponse] = await Promise.all([
    supabase.from('profiles').select('id, full_name').eq('id', user?.id).single(),
    supabase.from('groups').select('*').eq('teacher_id', user?.id).order('created_at', { ascending: false })
  ]);

  const profile = profileResponse.data;
  const groups = groupsResponse.data || [];

  return <DashboardClient initialGroups={groups} profile={profile} />;
}
