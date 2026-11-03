-- refund-return.com policy DB (research/02-policy-db.md)
create type scope_channel as enum ('any','in_store','online','marketplace_3p','app');
create type rule_type as enum ('window','exclusion','fee','receipt','refund_method','refund_timing','exchange','price_adjustment','membership','holiday','cancellation');
create type review_status as enum ('extracted','reviewed','published','stale','disputed');

create table brands (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  kind text not null default 'retailer' check (kind in ('retailer','marketplace','subscription','airline')),
  category text,
  official_policy_url text,
  returns_portal_url text,
  us_search_volume int,
  launch_status text not null default 'candidate' check (launch_status in ('candidate','launch','dropped')),
  indexable boolean not null default false,
  last_verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table snapshots (
  id bigint generated always as identity primary key,
  brand_id bigint references brands(id) on delete set null,
  source_url text not null,
  loaded_url text,
  fetched_at timestamptz,
  sha256 text not null,
  apify_run_id text,
  apify_dataset_id text,
  storage_path text,
  quality text,
  created_at timestamptz not null default now(),
  unique (source_url, sha256)
);

create table policy_rules (
  id bigint generated always as identity primary key,
  brand_id bigint not null references brands(id) on delete cascade,
  snapshot_id bigint not null references snapshots(id),
  rule_type rule_type not null,
  scope_channel scope_channel not null default 'any',
  scope_category text,
  season_start_md text,  -- 'MM-DD'
  season_end_md text,
  window_days int,
  window_anchor text check (window_anchor in ('purchase','receipt','delivery','purchase_or_receipt')),
  window_until_md text,  -- holiday "returnable until" 'MM-DD'
  fee_desc text,
  value_text text not null,          -- our wording (published)
  quote text not null,               -- verbatim source sentence (internal only, never rendered)
  status review_status not null default 'extracted',
  extracted_by text not null default 'llm' check (extracted_by in ('llm','human')),
  reviewed_by text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
create index on policy_rules (brand_id, status);

create table policy_changes (
  id bigint generated always as identity primary key,
  brand_id bigint not null references brands(id) on delete cascade,
  rule_id bigint references policy_rules(id) on delete set null,
  old_value text, new_value text,
  snapshot_from bigint references snapshots(id),
  snapshot_to bigint references snapshots(id),
  detected_at timestamptz not null default now(),
  news_slug text
);

create table laws (
  id bigint generated always as identity primary key,
  jurisdiction text not null,          -- 'US', 'US-CA', 'UK', 'EU'
  citation text not null,
  official_url text not null,
  snapshot_id bigint references snapshots(id),
  summary text,
  reviewed_by text,
  reviewed_at timestamptz,
  unique (jurisdiction, citation)
);

create table go_links (
  slug text primary key,               -- /go/[slug]
  destination text not null,
  is_affiliate boolean not null default false,
  updated_at timestamptz not null default now()
);

-- Public site reads only published data; writes only via service role.
alter table brands enable row level security;
alter table snapshots enable row level security;
alter table policy_rules enable row level security;
alter table policy_changes enable row level security;
alter table laws enable row level security;
alter table go_links enable row level security;
create policy "public read brands" on brands for select using (launch_status = 'launch');
create policy "public read published rules" on policy_rules for select using (status = 'published');
create policy "public read laws" on laws for select using (reviewed_at is not null);
create policy "public read changes" on policy_changes for select using (true);
-- policy_rules.quote must never reach the client: the app selects explicit columns via a view.
create view public_rules with (security_invoker = true) as
  select id, brand_id, rule_type, scope_channel, scope_category, season_start_md, season_end_md,
         window_days, window_anchor, window_until_md, fee_desc, value_text, reviewed_at
  from policy_rules where status = 'published';
