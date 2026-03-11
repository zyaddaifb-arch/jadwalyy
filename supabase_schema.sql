-- Create a table for public profiles (Teachers)
create table profiles (
  id uuid references auth.users not null primary key,
  full_name text not null,
  phone text,
  subject text,
  public_slug text unique,
  bio text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) for profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for lesson groups
create table groups (
  id uuid default gen_random_uuid() primary key,
  teacher_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  subject text not null,
  description text,
  time text not null, -- e.g., "الأحد، ٠٤:٠٠ م"
  seats_total int not null check (seats_total > 0),
  seats_reserved int default 0 not null,
  status text default 'نشط' not null, -- 'نشط', 'مكتمل', 'مغلق'
  color text default 'bg-primary',
  price numeric(10, 2),
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  CONSTRAINT capacity_check check (seats_reserved <= seats_total)
);

-- Set up RLS for groups
alter table groups enable row level security;

create policy "Groups are viewable by everyone." on groups
  for select using (true);

create policy "Teachers can manage their own groups." on groups
  for all using (auth.uid() = teacher_id);

-- Create a table for bookings
create table bookings (
  id uuid default gen_random_uuid() primary key,
  group_id uuid references groups(id) on delete cascade not null,
  student_name text not null,
  student_phone text not null,
  parent_phone text,
  school text,
  notes text,
  status text default 'نشط' not null, -- 'نشط', 'ملغي'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for bookings
alter table bookings enable row level security;

create policy "Teachers can view bookings for their groups." on bookings
  for select using (
    exists (
      select 1 from groups
      where groups.id = bookings.group_id
      and groups.teacher_id = auth.uid()
    )
  );

create policy "Anyone can create a booking." on bookings
  for insert with check (true);

-- Function to handle new user signup and create a profile
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone, subject)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'subject'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to handle before insert on booking to validate conditions
create or replace function validate_booking_and_increment()
returns trigger as $$
declare
  v_group_status text;
  v_seats_total int;
  v_seats_reserved int;
begin
  -- Fetch group details and lock row
  select status, seats_total, seats_reserved into v_group_status, v_seats_total, v_seats_reserved
  from groups
  where id = NEW.group_id for update;

  if not found then
    raise exception 'المجموعة غير موجودة.';
  end if;

  if v_group_status != 'نشط' then
    raise exception 'لا يمكن الحجز في هذه المجموعة لأنها غير متاحة للحجز حالياً.';
  end if;
  
  if v_seats_reserved >= v_seats_total then
    raise exception 'عذراً، المجموعة مكتملة العدد.';
  end if;

  update groups
  set seats_reserved = seats_reserved + 1
  where id = NEW.group_id;

  return NEW;
end;
$$ language plpgsql security definer;

-- Trigger to validate and increment before insert
create trigger on_booking_before_insert
  before insert on bookings
  for each row execute procedure validate_booking_and_increment();
