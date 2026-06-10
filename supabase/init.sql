-- ============================================================================
-- Y&S Osaka Trip Diary — Supabase init script (idempotent, safe to re-run)
-- Run this in Supabase Dashboard → SQL Editor.
-- 같은 Supabase 프로젝트(후쿠오카 trip_* 테이블이 있는 DB)에 osaka_* 테이블을
-- 별도로 생성합니다. 기존 후쿠오카 데이터는 건드리지 않습니다.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. osaka_memories — 각 스톱에 대한 기록 (메모/별점/사진/지출 등)
-- ---------------------------------------------------------------------------

create table if not exists public.osaka_memories (
  trip_id text not null,
  stop_id text not null,
  visited boolean not null default false,
  status text not null default 'planned'
    check (status in ('planned', 'going', 'done', 'skipped')),
  rating integer not null default 0 check (rating >= 0 and rating <= 5),
  rating_y integer not null default 0 check (rating_y >= 0 and rating_y <= 5),
  rating_s integer not null default 0 check (rating_s >= 0 and rating_s <= 5),
  note text not null default '',
  comments jsonb not null default '[]'::jsonb,
  y_comment text not null default '',
  s_comment text not null default '',
  photo_url text not null default '',
  photos text[] not null default '{}',
  photo_captions jsonb not null default '{}'::jsonb,
  expense_amount integer not null default 0 check (expense_amount >= 0),
  expense_category text not null default 'none'
    check (expense_category in ('none', 'food', 'drink', 'transport', 'shopping', 'ticket', 'etc')),
  expense_payer text not null default 'none'
    check (expense_payer in ('none', 'y', 's', 'shared')),
  expense_method text not null default 'unknown'
    check (expense_method in ('unknown', 'cash', 'card')),
  skipped_reason text not null default '',
  updated_at timestamptz not null default now(),
  primary key (trip_id, stop_id)
);

create index if not exists osaka_memories_trip_id_updated_at_idx
  on public.osaka_memories (trip_id, updated_at desc);

alter table public.osaka_memories enable row level security;
-- writes go through Next.js server route with service-role key, so no anon policies needed

-- ---------------------------------------------------------------------------
-- 2. osaka_days — Day 메타 (제목, 무드, 요약, 일기)
-- ---------------------------------------------------------------------------

create table if not exists public.osaka_days (
  trip_id text not null,
  day integer not null,
  date text not null default '',
  title text not null default '',
  mood text not null default '',
  summary text not null default '',
  journal text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (trip_id, day)
);

alter table public.osaka_days enable row level security;

-- ---------------------------------------------------------------------------
-- 3. osaka_stops — 편집 가능한 스톱 데이터 (정적 기본값 위에 덧입혀짐)
-- ---------------------------------------------------------------------------

create table if not exists public.osaka_stops (
  trip_id text not null,
  stop_id text not null,
  day integer not null,
  time text not null default '',
  title text not null default '',
  subtitle text not null default '',
  name_zh text not null default '',
  mrt text not null default '',
  phrase text not null default '',
  category text not null default 'sight'
    check (category in ('food', 'coffee', 'beer', 'whisky', 'sight', 'shopping', 'transit', 'hotel')),
  lat double precision not null default 34.6937,
  lng double precision not null default 135.5023,
  highlights text[] not null default '{}',
  prompt text not null default '',
  maps_query text not null default '',
  sort_order integer not null default 0,
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (trip_id, stop_id)
);

create index if not exists osaka_stops_trip_day_sort_idx
  on public.osaka_stops (trip_id, day, sort_order);

alter table public.osaka_stops enable row level security;

-- ---------------------------------------------------------------------------
-- 4. osaka_stop_plans — 우선순위/체류시간/대안/플렉스팁 (편집 가능)
-- ---------------------------------------------------------------------------

create table if not exists public.osaka_stop_plans (
  trip_id text not null,
  stop_id text not null,
  priority text not null default 'optional'
    check (priority in ('must', 'optional', 'backup')),
  duration_minutes integer not null default 60 check (duration_minutes >= 0),
  alternatives text[] not null default '{}',
  flex_tip text not null default '',
  opening_hours text not null default '',
  booking_status text not null default '',
  risk_level text not null default 'low'
    check (risk_level in ('low', 'medium', 'high')),
  risk_note text not null default '',
  updated_at timestamptz not null default now(),
  primary key (trip_id, stop_id)
);

alter table public.osaka_stop_plans enable row level security;

-- ---------------------------------------------------------------------------
-- 5. osaka_essentials — 준비 체크리스트 (항목 + 체크 상태)
-- ---------------------------------------------------------------------------

create table if not exists public.osaka_essentials (
  trip_id text not null,
  item_id text not null,
  label text not null,
  sort_order integer not null default 0,
  checked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (trip_id, item_id)
);

create index if not exists osaka_essentials_trip_sort_idx
  on public.osaka_essentials (trip_id, sort_order);

alter table public.osaka_essentials enable row level security;

-- ---------------------------------------------------------------------------
-- 6. osaka_expenses — 가계부 (스톱과 무관한 지출: 편의점/교통/간식 등)
-- ---------------------------------------------------------------------------

create table if not exists public.osaka_expenses (
  trip_id text not null,
  id text not null,
  day integer not null default 0,
  amount integer not null default 0 check (amount >= 0),
  category text not null default 'none',
  payer text not null default 'none',
  method text not null default 'unknown',
  label text not null default '',
  at timestamptz not null default now(),
  primary key (trip_id, id)
);

create index if not exists osaka_expenses_trip_idx
  on public.osaka_expenses (trip_id, day, at);

alter table public.osaka_expenses enable row level security;
-- writes go through the Next.js server route with the service-role key

-- ---------------------------------------------------------------------------
-- 7. osaka_vault — 예약/문서 보관함
-- ---------------------------------------------------------------------------

create table if not exists public.osaka_vault (
  trip_id text not null,
  id text not null,
  kind text not null default 'other',
  title text not null default '',
  provider text not null default '',
  confirmation text not null default '',
  flight_no text not null default '',
  start_at text not null default '',
  location text not null default '',
  link text not null default '',
  amount integer not null default 0 check (amount >= 0),
  owner text not null default 'shared',
  status text not null default 'confirmed',
  notes text not null default '',
  document_url text not null default '',
  updated_at timestamptz not null default now(),
  primary key (trip_id, id)
);

create index if not exists osaka_vault_trip_start_idx
  on public.osaka_vault (trip_id, start_at);

alter table public.osaka_vault enable row level security;

-- ---------------------------------------------------------------------------
-- 7b. osaka_travelers — 여행자별 여권 / 출입국심사서
-- ---------------------------------------------------------------------------

create table if not exists public.osaka_travelers (
  trip_id text not null,
  id text not null check (id in ('youngha', 'sohyun')),
  passport_name text not null default '',
  passport_no text not null default '',
  nationality text not null default 'KOR',
  birth_date text not null default '',
  issue_date text not null default '',
  expiry_date text not null default '',
  passport_photo_url text not null default '',
  arrival_card_url text not null default '',
  notes text not null default '',
  updated_at timestamptz not null default now(),
  primary key (trip_id, id)
);

alter table public.osaka_travelers enable row level security;

-- ---------------------------------------------------------------------------
-- 8. osaka_packing — 준비물 체크리스트
-- ---------------------------------------------------------------------------

create table if not exists public.osaka_packing (
  trip_id text not null,
  id text not null,
  label text not null default '',
  category text not null default 'etc',
  owner text not null default 'shared',
  packed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (trip_id, id)
);

alter table public.osaka_packing enable row level security;

-- ---------------------------------------------------------------------------
-- 9. Storage bucket — 사진 업로드 (PhotoUploader 컴포넌트가 사용)
--    후쿠오카의 trip-photos 버킷과 분리된 osaka-photos 버킷
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('osaka-photos', 'osaka-photos', true)
on conflict (id) do update set public = excluded.public;

-- public read so MemoryEditor/RecapMode/PrintPage can render images directly
drop policy if exists "osaka-photos: public read" on storage.objects;
create policy "osaka-photos: public read"
  on storage.objects for select
  using (bucket_id = 'osaka-photos');

-- 업로드/삭제는 service-role 키를 사용하는 /api/upload 서버 라우트로만 수행
